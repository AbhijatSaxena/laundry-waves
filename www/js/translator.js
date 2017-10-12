(function() {

    'use strict';

    angular.module('LaundryWaves')
                .factory('$translator', ['$http', '$endpoints', function($http, $endpoints) {
                        

                        var DEFAULT_HEADERS = {
                              // 'Content-Type': 'application/json'
                              // 'X-Authentication': true, 
                              // 'X-API-KEY': 'abc'
                        };
                        
                        var _translator = {};

                        _translator.translate = function(url, params, payload, headers) {
                            var _reqObject = {},
                                _url, 
                                _verb, 
                                _headers = DEFAULT_HEADERS 
                            
                            params = params || {};
                            
                            if ($endpoints.serviceList && typeof $endpoints.serviceList === "object") {
                                _verb = $endpoints.serviceList[url].method;
                                _url = $endpoints.serviceList[url].endpoint;
                            } else {
                                //throw new Error("Unable to find Endpoint or method");
                                alert("Unable to find Endpoint or method");
                            }

                            _reqObject.method = _verb;
                            _reqObject.url = _url;
                            _reqObject.headers = _headers || {};
                            _reqObject.data = payload || {};
                            return $http(_reqObject);
                        };

                        return _translator;
        }]);
})();
