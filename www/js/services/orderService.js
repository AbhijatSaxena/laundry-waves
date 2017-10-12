angular.module('LaundryWaves')
    .service('OrderService', function (UserFactory, StorageFactory, $translator) {
        return {
            placeOrder: function (rrpoints, order) {
                var customerId = UserFactory.getCurrentUserId();
                var selectedItems = StorageFactory.getSelectedItems();
                var addressId = UserFactory.addressId;

                function getAddons(addons) {
                    var addonsToReturn = [];
                    _.each(addons, function (addon) {
                        var orderAddon = {
                            addon: addon.id,
                            acount: addon.qty
                        };
                        addonsToReturn.push(orderAddon);
                    });
                    return addonsToReturn;
                }

                function getData() {
                    var data = [];

                    _.each(selectedItems, function (item) {
                        var orderItem = {
                            custId: customerId,
                            itemId: item.item_id,
                            serviceId: item.item_service_id,
                            icount: item.qty,
                            cost: item.item_cost,
                            rpoints: item.item_rpoints,
                            addons: getAddons(item.item_addons)
                        };
                        data.push(orderItem);
                    });

                    return data;
                }

                var payload = {
                    rrpoints: rrpoints,
                    subtotal: order.subTotal,
                    rPointsUsed: order.redeemableAmount,
                    totalAmount: order.total,
                    vat: order.taxedAmount,
                    totalAmountPaid: order.totalPayableAmount,
                    addressId: addressId,
                    data: getData()
                };

                 return $translator.translate('app.orders.place', {}, payload).then(function (res){
                  return res;
                }, function (err) {
                  return {message: 'Unable to place the order.', type: 'error'};
                });
            },
            getOrderHistory: function () {
                var customerId = UserFactory.getCurrentUserId();
                return $translator.translate('app.order.details', {}, {customerId: customerId}).then(function (res){
                  return res;
                }, function (err) {
                  return {message: 'Unable to get order history.', type: 'error'};
                });
            },
            getOrderDetails: function (orderId) {
                var customerId = UserFactory.getCurrentUserId();
                 return $translator.translate('app.order.history', {}, {customerId: customerId, orderId: orderId}).then(function (res){
                  return res;
                }, function (err) {
                  return {message: 'Unable to get order details.', type: 'error'};
                });
            }
        };
    });
