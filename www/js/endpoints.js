(function () {

    'use strict';

    angular.module('LaundryWaves')
             .factory('$endpoints', function () {
                var _exports = {};
                var apiBaseUrl = 'http://www.cbsatwork.com/laundry',
                serviceList = {};


                serviceList['app.register'] = {
                    endpoint: apiBaseUrl + '/api-registration',
                    method: 'post'
                };

                serviceList['app.login'] = {
                    endpoint: apiBaseUrl + '/api-authentication',
                    method: 'post'
                };
                serviceList['app.get.Profile'] = {
                    endpoint: apiBaseUrl + '/api-getprofile',
                    method: 'post'
                };
                
                serviceList['app.categories.get'] = {
                    endpoint: apiBaseUrl + '/api-services',
                    method: 'get'
                };

                serviceList['app.items.get'] = {
                    endpoint: apiBaseUrl + '/api-catalogitems',
                    method: 'post'
                };
                serviceList['app.itemTypes.get'] = {
                    endpoint: apiBaseUrl + '/api-itemtypes',
                    method: 'get'
                };
                
                serviceList['app.settings.get'] = {
                    endpoint: apiBaseUrl + '/api-settings',
                    method: 'get'
                };

                serviceList['app.apartments.get'] = {
                    endpoint: apiBaseUrl + '/api-apartments',
                    method: 'get'
                };

                serviceList['app.areas.get'] = {
                    endpoint: apiBaseUrl + '/api-areas',
                    method: 'get'
                };

                serviceList['app.orders.place'] = {
                    endpoint: apiBaseUrl + '/api-placeorder',
                    method: 'post'
                };

                serviceList['app.order.details'] = {
                    endpoint: apiBaseUrl + '/api-placeorderids',
                    method: 'post'
                };

                serviceList['app.order.history'] = {
                    endpoint: apiBaseUrl + '/api-placeorderhistory',
                    method: 'post'
                };

                serviceList['app.address.post'] = {
                    endpoint: apiBaseUrl + '/api-postaddress',
                    method: 'post'
                };

                serviceList['app.address.get'] = {
                    endpoint: apiBaseUrl + '/api-getaddress',
                    method: 'post'
                };

                serviceList['app.orders.place'] = {
                    endpoint: apiBaseUrl + '/api-placeorder',
                    method: 'post'
                };

                serviceList['app.blocks.get'] = {
                    endpoint: apiBaseUrl + '/api-blocks',
                    method: 'post'
                };

                serviceList['app.flats.get'] = {
                    endpoint: apiBaseUrl + '/api-flats',
                    method: 'post'
                };

                serviceList['app.Profile.update'] = {
                    endpoint: apiBaseUrl + '/api-updateprofile',
                    method: 'post'
                };

                serviceList['item.types.get'] = {
                    endpoint: apiBaseUrl + '/api-itemtypes',
                    method: 'get'
                };

                _exports.serviceList = serviceList;

                _exports.baseUrl = apiBaseUrl;

                Object.freeze(_exports);

                return _exports;

        });

})();
