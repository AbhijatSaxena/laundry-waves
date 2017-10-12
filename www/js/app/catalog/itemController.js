angular.module('LaundryWaves')
  .controller('ItemCtrl', function ($http, $scope, $rootScope, $ionicModal, $ionicPopup, StorageFactory, HelperFactory) {
    $rootScope.showFooter = true;
    $scope.itemSearch = {
      item_name: ''
    };
    $scope.clearSearch = function () {
      $scope.itemSearch = {
        item_name: ''
      };
    };

    $scope.selectedCategory = StorageFactory.getSelectedCategory();
    var itemTypeTabIndex = StorageFactory.getItemTypeTabIndex() || 1;
    $scope.itemData = StorageFactory.getCatalogByItemTypeAndServiceIds(itemTypeTabIndex, $scope.selectedCategory.id);

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
