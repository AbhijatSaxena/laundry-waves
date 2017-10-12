angular.module('LaundryWaves')
  .service('UserService', function ($translator) {
    return {
      performLogin: function (user) {
        return $translator.translate('app.login', {}, user).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to perform login.', type: 'error'};
        })
      },
      performRegistration: function (user) {
        return $translator.translate('app.register', {}, user).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to perform registration.', type: 'error'};
        });
      },
      getProfile: function (userId) {
        return $translator.translate('app.get.Profile', {}, {id: userId}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get profile details.', type: 'error'};
        });
      },
      postAddress: function (address) {
        return $translator.translate('app.address.post', {}, address).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to post the address.', type: 'error'};
        });
      },
      getAddress: function (userId) {
        return $translator.translate('app.address.get', {}, {customerId:userId}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to post the address.', type: 'error'};
        });
      },
      getAreas: function () {
        return $translator.translate('app.areas.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get areas.', type: 'error'};
        });
      },
      getApartments: function () {
        return $translator.translate('app.apartments.get', {}, {}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get areas.', type: 'error'};
        });
      },
      getBlocks: function (aptId) {
        return $translator.translate('app.blocks.get', {}, {apartmentId: aptId}).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get blocks.', type: 'error'};
        });
      },
      getFlats: function(payload) {
        return $translator.translate('app.flats.get', {}, payload).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to get blocks.', type: 'error'};
        });
      },
      updateProfile: function (payload) {
        return $translator.translate('app.Profile.update', {}, payload).then(function (res){
          return res;
        }, function (err) {
          return {message: 'Unable to update profile.', type: 'error'};
        });
      }
    };
  });
