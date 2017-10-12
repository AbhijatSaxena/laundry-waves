angular.module('LaundryWaves')
  .controller('OrdersCtrl', function ($http, $scope, $rootScope, $state, $ionicPopup, $localStorage, StorageFactory, $ionicHistory, HelperFactory) {
    $rootScope.showFooter = true;

    $scope.categories = StorageFactory.getAllCategories();
    HelperFactory.nextScreen = 'app.address';
    $scope.getLastView = function () {
      return $ionicHistory.backView().stateName;
    };

    $scope.getFilteredItem = function (categoryId) {
      return StorageFactory.getCatalogUnderCategoryFilteredByQuantity(categoryId);
    };

    $scope.resetLocalStorage = function () {
      //Confirmation Pop-Up
      var confirmPopup = $ionicPopup.confirm({
        template: 'Are you sure you want to the Reset Local Storage?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          //Perform RESET !!!
          StorageFactory.reset();
          var alertPopup = $ionicPopup.alert({
            template: 'The Local Storage has been Reset.'
          });
          alertPopup.then(function () {
            //Goto HOME
            $state.go('app.home');
          });
        } else {
          // Cancel Code
        }
      });
    };

    //Common Methods
    $scope.incrementQty = function (item, max) {
      HelperFactory.incrementQty(item, max);
    };
    $scope.decrementQty = function (item) {
      HelperFactory.decrementQty(item);
    };
    $scope.showAddon = function (item) {
      HelperFactory.showAddon(item, $scope)
    };
    $scope.closeModel = function () {
      HelperFactory.closeModel($scope);
    };
  });
