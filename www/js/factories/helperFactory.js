angular.module('LaundryWaves')
  .factory('HelperFactory', function ($ionicPopup) {
      return {
        incrementQty: function (item, max) {
          if (_.isNumber(max)) {
            if (item.qty < max) {
              item.qty += 1;
            }
          }
        },
        decrementQty: function (item) {
          if (item.qty > 0) {
            //decrement self
            item.qty -= 1;
            //decrement children
            if (item.item_addons) {
              _.each(item.item_addons, function (addon) {
                if (addon.qty > item.qty) {
                  addon.qty = item.qty;
                }
              });
            }
          }
        },
        showAddon: function (item, scope) {
          scope.item = item;
          scope.addonPopUp = $ionicPopup.show({
            templateUrl: 'views/app/catalog/addonPopup.html',
            title: 'Enter Addon',
            scope: scope,
            buttons: [{
              text: 'Done',
              type: 'button-positive',
              onTap: function (e) {
                return true;
              }
            }]
          });
        },
        closeModel: function (scope) {
          scope.addonPopUp.close();
        },
        nextScreen: ''
      };
    }
  );
