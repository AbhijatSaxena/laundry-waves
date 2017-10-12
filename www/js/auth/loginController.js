angular.module('LaundryWaves')
  .controller('LoginCtrl', function ($scope, $ionicModal, UserFactory, StorageFactory, $state) {
    if (StorageFactory.getSession()) {
      $state.go('app.home');
    }

    $scope.user = {
      email: '',
      password: ''
    };
    $scope.emailInitiated = false;

    $scope.doLogIn = function (form, user) {
      if (form.$valid) {
        UserFactory.performLogin(user);
      }
    };

    $ionicModal.fromTemplateUrl('views/partials/forgotPassword.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.forgot_password_modal = modal;
    });

    $scope.showForgotPassword = function () {
      $scope.forgot_password_modal.show();
    };

    $scope.requestNewPassword = function () {
      $scope.emailInitiated = true;
    };

    $ionicModal.fromTemplateUrl('views/partials/privacyPolicy.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.privacy_policy_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/partials/termsOfService.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.terms_of_service_modal = modal;
    });

    $scope.showPrivacyPolicy = function () {
      $scope.privacy_policy_modal.show();
    };

    $scope.showTerms = function () {
      $scope.terms_of_service_modal.show();
    };

    $scope.clearControls = function () {
      $scope.user.password = '';
    }
  });
