angular.module('LaundryWaves')
  .service('ItemsService', function ($translator) {
    return {
      getItems: function (customerId) {
        return $translator.translate('app.items.get', {}, {customerId: customerId}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to perform login.', type: 'error'};
        })
      }, 

      getItemTypes: function () {
        return $translator.translate('app.itemTypes.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get item types.', type: 'error'};
        })
      }
    };
  });
