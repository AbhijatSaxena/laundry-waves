angular.module('LaundryWaves')
  .service('ApartmentsService', function ($translator) {

    return {
      getApartments: function () {
        return $translator.translate('app.apartments.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get apartments.', type: 'error'};
        });
      }
    };
});
