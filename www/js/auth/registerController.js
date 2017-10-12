angular.module('LaundryWaves')
  .controller('RegisterCtrl', function ($scope, UserFactory, StorageFactory, $state, apartments, areas) {
    if (StorageFactory.getSession()) {
      $state.go('app.home');
    }

    $scope.showMsg = false;
    $scope.user = {
      firstName: '',
      lastName: '',
      password: '',
      phoneNo: '',
      email: '',
      apartment: '',
      userType: '',
      refId: ''
    };
    $scope.userTypes = [
      {
        name: 'None',
        value: ''
      },
      {
        name: 'Individual',
        value: 'user'
      },
      {
        name: 'Apartment',
        value: 'apartment'
      }
    ];
    $scope.user.userType = $scope.userTypes[0].value;

    $scope.doSignUp = function (form, user) {
      if (form.$valid) {
        user.apartment = user.apartment ? user.apartment.id : "";
        UserFactory.performRegistration(user);
      }
    };

    var apartmentsSource = new Bloodhound({
      datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: apartments
    });

    $scope.apartmentSourceOptions = {
      hint: false,
      highlight: false,
      minLength: 1,
      editable: false
    };

    apartmentsSource.initialize();

    $scope.apartmentSource = [
      {
        displayKey: 'name',
        source: apartmentsSource.ttAdapter()
      }];

    var areasSource = new Bloodhound({
      datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: areas
    });

    $scope.areasSourceOptions = {
      hint: false,
      highlight: false,
      minLength: 1,
      editable: false
    };

    areasSource.initialize();

    $scope.areasSource = [
      {
        displayKey: 'name',
        source: areasSource.ttAdapter()
      }];

    $scope.validateArea = function (user) {
      $scope.areaIsValid = areas.indexOf(user.area) !== -1;
      $scope.showMsg = true;
    };

    $scope.areaChanged = function () {
      $scope.showMsg = false;
    };
  });
