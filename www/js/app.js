angular.module('underscore', [])
  .factory('_', function () {
    return window._;
  });

angular.module('LaundryWaves', [
    'ionic',
    'underscore',
    'angular.filter',
    'ngMessages',
    'ngResource',
    'ngStorage',
    'ionic-native-transitions',
    'siyfion.sfTypeahead',
    'tabSlideBox',
    'tabSlideBoxScrollExtension',
    'ngCordova'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider, $httpProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.views.swipeBackEnabled(false);

    //To Disable Preflight requests for Manipulative calls like POST/PUT/DELETE (not GET)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    //States
    $stateProvider
      .state('welcome', {
        url: "/welcome",
        templateUrl: "views/welcome.html",
        controller: 'WelcomeCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('register', {
        url: "/register",
        templateUrl: "views/auth/register.html",
        controller: 'RegisterCtrl',
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        data: {
          requireLogin: false
        },
        resolve: {
          apartments: function (StorageFactory, ApartmentsService, $q) {
            return ApartmentsService.getApartments().then(function (data) {
              return data.data;
            });
          },
          areas: function (StorageFactory, UserService, $q) {
            return UserService.getAreas().then(function (data) {
              return data.data;
            });
          }
        }
      })
      .state('login', {
        url: "/login",
        templateUrl: "views/auth/login.html",
        controller: 'LoginCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "views/app/app.html",
        controller: 'AppCtrl',
        data: {
          requireLogin: true
        }
      })
      .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "views/app/home.html",
            controller: 'HomeCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.account', {
        url: "/account",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/account.html",
            controller: 'AccountCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('app.orderHistory', {
        url: "/order-history",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/order-history.html",
            controller: 'OrderHistoryCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('app.orderDetails', {
        url: "/order-details",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/order-details.html",
            controller: 'OrderDetailsCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('app.rewards', {
        url: "/rewards",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/rewards.html",
            controller: 'RewardsCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        },
        resolve: {
          profile: function (StorageFactory, UserService) {
            return UserService.getProfile(StorageFactory.getUserId()).then(function (data) {
              return data.data;
            });
          }
        }
      })
      .state('app.orders', {
        url: "/orders",
        nativeTransitions: {
          "type": "slide",
          "direction": "up",
          "duration": 300
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/orders/orders.html",
            controller: 'OrdersCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.address', {
        url: "/address",
        nativeTransitions: {
          "type": "slide",
          "direction": "up"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/orders/address.html",
            controller: 'AddressCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.orderSummary', {
        url: "/orderSummary",
        nativeTransitions: {
          "type": "slide",
          "direction": "left"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/orders/orderSummary.html",
            controller: 'OrderSummaryCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog', {
        url: "/catalog",
        abstract: true,
        nativeTransitions: {
          "type": "slide",
          "direction": "left"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/catalog/catalog.html",
            controller: 'CatalogCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog.men', {
        url: "/men",
        views: {
          'men-tab': {
            templateUrl: "views/app/catalog/item.html",
            controller: 'ItemCtrl'
          }
        },
        nativeTransitions: {
          "type": "fade",
          "duration": 0
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog.women', {
        url: "/women",
        views: {
          'women-tab': {
            templateUrl: "views/app/catalog/item.html",
            controller: 'ItemCtrl'
          }
        },
        nativeTransitions: {
          "type": "fade",
          "duration": 0
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog.kids', {
        url: "/kids",
        views: {
          'kids-tab': {
            templateUrl: "views/app/catalog/item.html",
            controller: 'ItemCtrl'
          }
        },
        nativeTransitions: {
          "type": "fade",
          "duration": 0
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog.infants', {
        url: "/infants",
        views: {
          'infants-tab': {
            templateUrl: "views/app/catalog/item.html",
            controller: 'ItemCtrl'
          }
        },
        nativeTransitions: {
          "type": "fade",
          "duration": 0
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('app.catalog.utilities', {
        url: "/utilities",
        views: {
          'utilities-tab': {
            templateUrl: "views/app/catalog/item.html",
            controller: 'ItemCtrl'
          }
        },
        nativeTransitions: {
          "type": "fade",
          "duration": 0
        },
        cache: false,
        data: {
          requireLogin: true
        }
      })
      .state('offline', {
        url: "/offline",
        abstract: true,
        templateUrl: "views/offline/offlineHome.html",
        controller: 'OfflineCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('offline.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "views/offline/offlineHome.html",
            controller: 'offlineHomeCtrl'
          }
        },
        cache: false,
        data: {
          requireLogin: false
        }
      })
      .state('app.profile', {
        url: "/account-profile",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/accountProfile.html",
            controller: 'AccountProfileCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      })
       .state('app.editAddress', {
        url: "/address-edit",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/orders/addressEdit.html",
            controller: 'AddressEditCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      })
       .state('app.changePassword', {
        url: "/change-password",
        nativeTransitions: {
          "type": "slide",
          "direction": "right"
        },
        views: {
          'menuContent': {
            templateUrl: "views/app/account/changePassword.html",
            controller: 'ChangePasswordCtrl'
          }
        },
        data: {
          requireLogin: true
        }
      });

    //on 404
    $urlRouterProvider.otherwise('/welcome');

    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 400, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });
  })
  .run(function ($rootScope, $state, StorageFactory, $ionicPlatform, InitializeFactory, $cordovaNetwork, $http) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin) {
        if (!StorageFactory.getSession()) {
          event.preventDefault();
          $state.go('login');
        }
      }
    });

    $ionicPlatform.ready(function () {


      var isOnline = $cordovaNetwork.isOnline();

      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        var onlineState = networkState;
      });

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        var offlineState = networkState;
      });

      if (isOnline) {
        if (StorageFactory.getSession()) {
          InitializeFactory.init(function () {
            $state.go('app.home');
          });
        }
      } else {
        $state.go('offline');
      }

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        // cordova.exec.setJsToNativeBridgeMode(cordova.exec.jsToNativeModes.XHR_NO_PAYLOAD);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      screen.lockOrientation('portrait');
    });
  });
