(function () {
    'use strict';
    angular.module('LaundryWaves')
        .controller('AccountProfileCtrl', function ($scope, $ionicModal, UserService, StorageFactory) {
            $scope.edit = {};
            $scope.edit.editForm = false;

            function getProfile() {
                UserService.getProfile(StorageFactory.getUserId()).then(function (data) {
                    var profileDetails = data.data;
                    $scope.user = {
                        "id": profileDetails.id,
                        "firstName": profileDetails.firstname,
                        "lastName": profileDetails.lastname,
                        "mobile": parseInt(profileDetails.mobile),
                        "email": profileDetails.email
                    };
                });
            }

            $scope.updateProfile = function (form) {
                if (form.$valid) {
                    UserService.updateProfile($scope.user).then(function (res) {
                        console.log('updated profile');
                        alert('profile updated');
                        $scope.accountProfileModal.hide();
                    }, function (err) {
                        console.log(err);
                    })
                }
            };

            $ionicModal.fromTemplateUrl('views/partials/addressBook.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addressBookModal = modal;
            });


            $scope.showAddressBook = function () {
                $scope.addressBookModal.show();
            };

            function getAddresses() {
                UserService.getAddress(StorageFactory.getUserId()).then(function (res) {
                    if (res.data && res.data.length > 0) {
                        $scope.addressess = res.data;
                    }
                });
            };


            $scope.closeProfile = function () {
                $scope.edit.editForm = false;
                // $scope.user = {};
                // getProfile();
                $scope.accountProfileModal.hide();
            }

            getProfile();
            getAddresses();

        });
})();