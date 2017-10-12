angular.module('LaundryWaves')
  .controller('OrderDetailsCtrl', function ($http, $scope, $state, $rootScope, OrderService, StorageFactory) {
    $rootScope.showFooter = false;

    $scope.selectedOrder = StorageFactory.getSelectedOrder();

    OrderService.getOrderDetails($scope.selectedOrder.order_id).then(function (response) {
      $scope.orderDetails = response.data;
    });

    $scope.parseDate = function (dateString) {
      return moment(dateString).format('MMMM Do YYYY, h:mm a');
    };
  });
