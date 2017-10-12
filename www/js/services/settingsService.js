angular.module('LaundryWaves')
  .service('SettingsService', function ($translator) {
    return {
      getSettings: function () {
        return $translator.translate('app.settings.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get settings.', type: 'error'};
        });
      }
    };
  });
