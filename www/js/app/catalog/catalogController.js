angular.module('LaundryWaves')
  .controller('CatalogCtrl', function ($http, $scope, $rootScope, $ionicModal, $ionicPopup, StorageFactory, ItemsService, $state, UserFactory, $ionicLoading, $timeout) {
    $rootScope.showFooter = true;
    var selectedCategory = StorageFactory.getSelectedCategory();
    var currentUser = UserFactory.getCurrentUserId();
    StorageFactory.setItemTypeTabIndex(1);
    $scope.itemTypes = StorageFactory.getItemTypes();
    $scope.selectItemTypeTab = function (itemTypeTabIndex) {
      StorageFactory.setItemTypeTabIndex(itemTypeTabIndex);
      switch (itemTypeTabIndex) {
        case 1 :
        {
          $state.go('app.catalog.men');
          break;
        }
        case 2 :
        {
          $state.go('app.catalog.women');
          break;
        }
        case 3 :
        {
          $state.go('app.catalog.kids');
          break;
        }
        case 4 :
        {
          $state.go('app.catalog.infants');
          break;
        }
        case 5 :
        {
          $state.go('app.catalog.utilities');
          break;
        }
      }
    };
  });
