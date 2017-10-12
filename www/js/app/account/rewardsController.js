angular.module('LaundryWaves')
  .controller('RewardsCtrl', function ($http, $scope, $state, $rootScope, RewardFactory, UserFactory, profile) {
    $rootScope.showFooter = false;

    $scope.currentUserId = UserFactory.getCurrentUserId();
    $scope.rewardsPoints = profile.rpoints;
  });
