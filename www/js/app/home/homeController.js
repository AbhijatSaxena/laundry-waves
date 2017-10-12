angular.module('LaundryWaves')
  .controller('HomeCtrl', function ($scope, $rootScope, $state, StorageFactory, $ionicSlideBoxDelegate, CategoryService, $ionicPlatform, InitializeFactory, HelperFactory) {
    $rootScope.showFooter = true;
    $scope.categories = StorageFactory.getAllCategories();
    HelperFactory.nextScreen = 'app.orders';
    var backButtonCallback = $ionicPlatform.registerBackButtonAction(
      function () {
        //DO NOTHING
      }, 100
    );
    $scope.$on('$destroy', backButtonCallback);

    $scope.navSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index, 500);
    };


    $scope.setCategory = function (category) {
      StorageFactory.setSelectedCategory(category);
      InitializeFactory.initCatalog(function () {
        $state.go('app.catalog.men', {}, {reload: true});
      });
    };
  });
