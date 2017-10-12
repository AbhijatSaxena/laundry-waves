angular.module('LaundryWaves')
  .controller('OrderHistoryCtrl', function ($http, $scope, $state, $rootScope, OrderService, StorageFactory) {
    $rootScope.showFooter = false;

    OrderService.getOrderHistory().then(function (response) {
      $scope.orderHistory = response.data;
    });

    $scope.parseDate = function (dateString) {
      return moment(dateString).format('MMMM Do YYYY, h:mm a');
    };

    $scope.selectOrder = function (order) {
      StorageFactory.setSelectedOrder(order);
      $state.go('app.orderDetails');
    };
  });
