angular.module('LaundryWaves')
  .factory('UserFactory', function (StorageFactory, UserService, $ionicLoading, $state, $ionicPopup, InitializeFactory) {
      function performLogin(user) {
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
        });
        UserService.performLogin(user).then(function (response) {
          $ionicLoading.hide();
            if(response.data){
            StorageFactory.setUserId(response.data.id);
            StorageFactory.setSession(true);
            StorageFactory.setAuthToken(response.data.oauth_id);
            InitializeFactory.init(function () {
              $state.go('app.home');
            });
          }else {
             $ionicPopup.alert({
              title: 'Login Failed',
              template: ''
            });
           }
        }, function () {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Login Failed',
            template: ''
          });
        });
      }

      return {
        getCurrentUserId: function () {
          return StorageFactory.getUserId();
        },
        performLogin: function (user) {
          return performLogin(user)
        },
        performRegistration: function (user) {
          $ionicLoading.show({
            template: 'Registering...'
          });
          UserService.performRegistration(user).then(function () {
            $ionicLoading.hide();
            performLogin(user);
          }, function () {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Registration Failed',
              template: ''
            });
          });
        },
        addressId: null
      };
    }
  );
