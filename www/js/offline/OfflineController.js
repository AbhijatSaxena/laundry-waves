angular.module('LaundryWaves')
  .controller('OfflineCtrl', function ($scope, StorageFactory, $rootScope, $state, HelperFactory) {
    $rootScope.showFooter = true;


    $scope.nextScreen = function () {
      $state.go(HelperFactory.nextScreen);
    }
  });
