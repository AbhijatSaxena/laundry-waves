angular.module('LaundryWaves')
  .controller('WelcomeCtrl', function ($scope, $state, StorageFactory) {
    if (StorageFactory.getSession()) {
      $state.go('app.home');
    }
  });
