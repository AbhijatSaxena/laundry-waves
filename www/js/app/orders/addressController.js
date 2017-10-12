angular.module('LaundryWaves')
  .controller('AddressCtrl', function ($http, $scope, $rootScope, $state, $ionicPopup, StorageFactory, RewardFactory, OrderService, UserService, $ionicModal, UserFactory, $filter, SettingsService) {
    $rootScope.showFooter = false;
    $scope.redeem = false;
    $scope.choice = 'COD';
    var profile, settings;
    $scope.total = StorageFactory.getOrderTotal();
    $scope.amountToPay = function () {
      return $scope.redeem ? $scope.total - $scope.redeemableAmount : $scope.total;
    };
    $scope.newAddress = false;
    $scope.individualAddress = {};
    $scope.apartmentAddress = {};
    $scope.showErrors = false;
    $scope.toggleChange = function () {
      $scope.redeem = $scope.redeem == false;
    };

    function getProfile() {
      UserService.getProfile(StorageFactory.getUserId()).then(function (data) {
        profile = data.data;
        $scope.profile = profile;
        $scope.rewardPoints = parseInt(profile.rpoints);
        if (profile.type == 'apartment') {
          getApartments();
          if (profile.flat_id !== null) {
            $scope.apartmentAddress.block = profile.block;
          } else {
            $scope.newAddress = true;
          }
        } else {
          getAddresses();
        }
        getSettings();
      });
    }

    function getSettings() {
      SettingsService.getSettings().then(function (data) {
        settings = data.data;
        $scope.conversionRate = settings.rpointsCost;
        $scope.minRewardsRestriction = $scope.rewardPoints >= settings.minPoints;
        $scope.redeemableAmount = RewardFactory.getRedeemableAmount($scope.rewardPoints, $scope.conversionRate);
      });
    }

    // resolve: {
    //       profile: function (StorageFactory, UserService, $q) {
    //         var deferred = $q.defer();
    //         UserService.getProfile(StorageFactory.getUserId()).then(function (data) {
    //           deferred.resolve(data);
    //         });
    //         return deferred.promise;
    //       },
    //       settings: function (SettingsService, $q) {
    //         var deferred = $q.defer();
    //         SettingsService.getSettings().then(function (data) {
    //           deferred.resolve(data);
    //         });
    //         return deferred.promise;
    //       }
    //     }

    // $scope.blocks = [
    //   {
    //     name: 'None',
    //     value: ''
    //   },
    //   {
    //     name: 'A',
    //     value: 'A'
    //   },
    //   {
    //     name: 'B',
    //     value: 'B'
    //   },
    //   {
    //     name: 'C',
    //     value: 'C'
    //   }
    // ];


    $ionicModal.fromTemplateUrl('views/partials/address.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.addressModal = modal;
    });

    $scope.clearForm = function (form) {
      $scope.individualAddress = {};
      $scope.apartmentAddress = {};
      form.$setPristine();
      $scope.showErrors = false;
      // form.$dirty = false;
      // form.$pristine = true;
    };

    $scope.postAddress = function (form) {
      if (form.$valid) {
        $scope.addressModal.hide();
        if (profile.type === 'user') {
          var address = {
            'customerId': profile.id,
            'address': $scope.individualAddress.field1 + ' ,' + $scope.individualAddress.area,
            'landmark': $scope.individualAddress.landMark,
            'pincode': $scope.individualAddress.pincode
          };
          if (address.address && address.landmark) {
            UserService.postAddress(address).then(function (res) {
              getAddresses();
            });
          }
        } else {
          var address = {
            'customerId': profile.id,
            'address': $scope.apartmentAddress.address,
            'flat': $scope.apartmentAddress.flat,
            'block': $scope.apartmentAddress.block
          };
          if (address.address && address.landmark) {
            UserService.postAddress(address).then(function (res) {
              getAddresses();
            });
          }
        }
      } else {
        $scope.showErrors = true;

      }
    };

    function getAddresses() {
      UserService.getAddress(profile.id).then(function (res) {
        if (res.data && res.data.length > 0) {
          $scope.addressess = res.data;
          $scope.newAddress = false;
          $scope.individualAddress.addressId = res.data[0].address_id;
        } else {
          $scope.newAddress = true;
        }
      });
    }

    function getAreas() {
      UserService.getAreas().then(function (res) {
        $scope.areas = res.data;
      });
    }

    function getApartments() {
      UserService.getApartments().then(function (res) {
        if (res.data && res.data.length > 0) {
          var userApartment = $filter('filter')(res.data, {'id': profile.apt_id})[0];
          $scope.apartmentAddress.apartmentName = userApartment.name;
          $scope.apartmentAddress.address = userApartment.address;
          getBlocks();
        }
      });
    }

    function getBlocks() {
      UserService.getBlocks(profile.apt_id).then(function (res) {
        if (res.data && res.data.length > 0) {
          $scope.blocks = res.data;
          if (profile.block_id !== null) {
            $scope.apartmentAddress.block = $filter('filter')($scope.blocks, {'id': profile.block_id})[0].name;
            // $scope.apartmentAddress.block = profile.block_id;
            $scope.getFlats();
          }
        }
      });
    }

    $scope.getFlats = function () {
      var payload = {'blockId': profile.block_id};
      UserService.getFlats(payload).then(function (res) {
        if (res.data && res.data.length > 0) {
          $scope.flats = res.data;
          if (profile.flat_id !== null) {
            $scope.apartmentAddress.flat = $filter('filter')($scope.flats, {'id': profile.flat_id})[0].name;
          }
        }
      });
    };

    $scope.placeOrder = function (form) {
      if (form.$valid) {
        if (profile.type === 'user' && $scope.newAddress === true) {
          $scope.postAddress(form);
        } else if (profile.type === 'apartment' && $scope.newAddress === true) {
          updateProfile();
        }
        submitOrder();
      } else {
        $scope.showErrors = true;
      }
    };

    function updateProfile() {
      var payload = {'id': profile.id, 'block': $scope.apartmentAddress.block, 'flat': $scope.apartmentAddress.flat.id}
      UserService.updateProfile(payload).then(function (res) {
        if (res.data) {
          console.log(res.data);
        }
      });
    }

    function submitOrder() {
      if (profile.type === 'user') {
        UserFactory.addressId = $scope.individualAddress.addressId;
      } else {
        UserFactory.addressId = null;
      }
      var confirmPopup = $ionicPopup.confirm({
        template: 'Are you sure you want to Place this Order?'
      });
      confirmPopup.then(function (res) {
        function preOrderCalculations() {
          var order = {};
          order.subTotal = StorageFactory.getOrderTotal();
          order.redeemableAmount = $scope.redeem ? $scope.redeemableAmount : 0;
          order.total = order.subTotal - order.redeemableAmount;
          order.taxedAmount = parseFloat(((order.total * settings.serviceCharge) / 100).toFixed(2));
          order.totalPayableAmount = (order.total + order.taxedAmount);
          order.redeem = $scope.redeem;
          return order;
        }

        if (res) {
          var pointsValue = RewardFactory.getPointsValue($scope.rewardPoints, $scope.conversionRate);
          var balance = pointsValue;
          var itemsRPoints = RewardFactory.getItemsRPoints();
          if ($scope.redeem) {
            if ($scope.redeemableAmount <= pointsValue) {
              balance = pointsValue - $scope.redeemableAmount;
            }
          }
          balance = RewardFactory.setPointsValue(balance, $scope.conversionRate) + itemsRPoints;
          var order = preOrderCalculations();
          OrderService.placeOrder(balance, order).then(function (response) {
            StorageFactory.placeOrder(order, response.data.message);
            $state.go('app.orderSummary');
          });
        } else {
          // Cancel Code
        }
      });
    }

    var stateArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    var states = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: stateArray
    });

    $scope.flatSourceOptions = {
      hint: true,
      highlight: false,
      minLength: 1
    };

    $scope.flatSource = [
      {
        name: 'states',
        source: states
      }
    ];

    function init() {
      getAreas();
      getProfile();
    }

    init();
  });
