angular.module('LaundryWaves')
  .controller('AccountCtrl', function ($http, $scope, $rootScope, $state, $ionicModal, $ionicActionSheet, StorageFactory, UserService) {
    $rootScope.showFooter = false;
    $scope.edit = {};
    $scope.edit.editForm = false;

    $ionicModal.fromTemplateUrl('views/partials/FAQ.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.faq_modal = modal;
    });

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

    $ionicModal.fromTemplateUrl('views/partials/inviteAndEarn.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.inviteAndEarnModal = modal;
    });

    $ionicModal.fromTemplateUrl('views/partials/contactUs.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.contact_us_modal = modal;
    });

    $scope.showFAQ = function () {
      $scope.faq_modal.show();
    };

    $scope.share = function () {
      $scope.inviteAndEarnModal.show();
    }
    
    $scope.showPrivacyPolicy = function () {
      $scope.privacy_policy_modal.show();
    };

    $scope.showTerms = function () {
      $scope.terms_of_service_modal.show();
    };


    $scope.changePassword = function () {
      $scope.changePasswordModal.show();
    }

    $scope.showLogOutMenu = function () {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        //Here you can add some more buttons
        // buttons: [
        // { text: '<b>Share</b> This' },
        // { text: 'Move' }
        // ],
        destructiveText: 'Logout',
        titleText: 'Are you sure you want to logout?',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          //Called when one of the non-destructive buttons is clicked,
          //with the index of the button that was clicked and the button object.
          //Return true to close the action sheet, or false to keep it opened.
          return true;
        },
        destructiveButtonClicked: function () {
          //Called when the destructive button is clicked.
          //Return true to close the action sheet, or false to keep it opened.
          StorageFactory.setSession(false);
          $state.go('welcome');
        }
      });
    };

    $scope.showContactUs = function () {
      $scope.contact_us_modal.show();
    }


    // $scope.closeProfile = function () {
    //   $scope.edit.editForm = false;
    //   // $scope.user = {};
    //   // getProfile();
    //   $scope.accountProfileModal.hide();
    // }

    // getProfile();
    // getAddresses();
  });
