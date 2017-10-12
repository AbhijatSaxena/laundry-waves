angular.module('LaundryWaves')
  .factory('RewardFactory', function (StorageFactory) {
      return {
        getPointsValue: function (rewardsPointsBalance, conversionRate) {
          return rewardsPointsBalance / conversionRate;
        },
        setPointsValue: function (rewardsPointsBalance, conversionRate) {
          return rewardsPointsBalance * conversionRate;
        },
        getRedeemableAmount: function (rewardPointsBalance, conversionRate) {
          var pointsValue = this.getPointsValue(rewardPointsBalance, conversionRate);
          var total = StorageFactory.getOrderTotal();
          return pointsValue >= total ? total : pointsValue
        },
        getItemsRPoints: function () {
          return _.reduce(StorageFactory.getSelectedItems(), function (sum, item) {
            return sum + (item.qty * item.item_rpoints);
          }, 0);
        }
      };
    }
  );
