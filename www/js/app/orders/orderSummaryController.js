angular.module('LaundryWaves')
    .controller('OrderSummaryCtrl', function ($http, $scope, $rootScope, $state, $ionicPopup, $localStorage, StorageFactory, $ionicPlatform, InitializeFactory) {
        $rootScope.showFooter = false;

        var backButtonCallback = $ionicPlatform.registerBackButtonAction(
            function () {
                //DO NOTHING
            }, 100
        );
        $scope.$on('$destroy', backButtonCallback);

        //initialization
        $scope.categories = StorageFactory.getAllCategories();
        $scope.order = StorageFactory.getPlacedOrder();

        $scope.date = angular.copy(moment().format('MMMM Do YYYY, h:mm a'));

        $scope.getFilteredItems = function (categoryId) {
            return _.filter($scope.order.catalog, function (item) {
                return item.item_service_id == categoryId;
            });
        };

        $scope.continue = function () {
            InitializeFactory.init(function () {
                $state.go('app.home');
            });
        }
    });
