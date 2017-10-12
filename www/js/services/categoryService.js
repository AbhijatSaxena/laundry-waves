angular.module('LaundryWaves')
  .service('CategoryService', function ($translator) {
    return {
      getCategories: function () {
         return $translator.translate('app.categories.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get categories.', type: 'error'};
        });
      }
    };
  });
