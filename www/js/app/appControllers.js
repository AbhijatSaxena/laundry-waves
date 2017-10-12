angular.module('LaundryWaves')
  .controller('AppCtrl', function ($scope, StorageFactory, $rootScope, $state, HelperFactory) {
    $rootScope.showFooter = true;
    $scope.getTotal = function () {
      return StorageFactory.getOrderTotal();
    };

    $scope.getItemCount = function () {
      var items = StorageFactory.getCatalog();
      if (items) {
        return _.reduce(items, function (sum, item) {
          return sum + item.qty;
        }, 0);
      }
      else {
        return 0
      }
    };

    $scope.getAddonCount = function () {
      var items = StorageFactory.getCatalog();
      if (items) {
        return _.reduce(items, function (sum, item) {
          return sum + _.reduce(item.item_addons, function (childSum, addon) {
              return childSum + addon.qty;
            }, 0);
        }, 0);
      }
      else {
        return 0
      }
    };

    $scope.nextScreen = function () {
      $state.go(HelperFactory.nextScreen);
    }
  });
