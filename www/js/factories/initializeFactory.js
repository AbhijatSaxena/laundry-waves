angular.module('LaundryWaves')
  .factory('InitializeFactory', function ($ionicLoading, CategoryService, StorageFactory, ItemsService, $state) {
      var initCatalog = function (callback) {
        $ionicLoading.show({
          template: 'Loading Items...'
        });
        ItemsService.getItems(StorageFactory.getUserId()).then(function (response) {
          $ionicLoading.hide();
          StorageFactory.syncCatalog(response.data);
          callback();
        }, function () {
          $ionicLoading.hide();
        });

         ItemsService.getItemTypes().then(function (response) {
          $ionicLoading.hide();
          StorageFactory.setItemTypes(response.data);
        }, function () {
          $ionicLoading.hide();
        });

      };

      return {
        initCatalog: function (callback) {
          initCatalog(callback);
        },
        init: function (callback) {
          $ionicLoading.show({
            template: 'Loading Services...'
          });
          CategoryService.getCategories().then(function (response) {
            StorageFactory.setCategories(response.data);
            $ionicLoading.hide();
            initCatalog(callback);
          }, function (response) {
            $ionicLoading.hide();
          });
        }
      };
    }
  );
