(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('ReferralRuleAddEditController', Controller);

function Controller($scope, ReferralService, $stateParams, $state, CoinService, $q, AppConstants) {
    
    function init() {
        
        $scope.referralRule = {};
        $scope.referralRule.active = true;
        $scope.message = '';
        $scope.referralRuleId = $stateParams.referralRuleId;
        
        if ($scope.referralRuleId === "new") {
            $scope.referralRuleId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";
        }
                    
        $q.all([
            $scope.getCoinList(),
            $scope.getRuleList()
        ]).then(function () {
            if($scope.operation === "Update")
            {
                ReferralService.getReferralRuleDetails($scope.referralRuleId).then(function (response) {
                    $scope.referralRule = response.referralRule;
                    $scope.coins.selectedCoin = _.find($scope.coins, {coinId: $scope.referralRule.coinId});
                    $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleId: $scope.referralRule.ruleId});
                });
            }
        });

    }
    
    $scope.handleSubmit = function() {
        $scope.message = null;
        if($scope.referralRuleId)
            $scope.updateReferralRule();
        else
            $scope.insertReferralRule();
    }
    
    $scope.updateReferralRule = function () {
        $scope.loading = true;
        $scope.referralRule.referralRuleId = $scope.referralRuleId;
        $scope.referralRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.referralRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.referralRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.referralRule.coinName = $scope.coins.selectedCoin.coinName;
        
        ReferralService.updateReferralRule($scope.referralRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertReferralRule = function () {
        $scope.loading = true;
        $scope.referralRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.referralRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.referralRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.referralRule.coinName = $scope.coins.selectedCoin.coinName;

        ReferralService.insertReferralRule($scope.referralRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.referralRuleId = result.referralRuleId;
                $state.transitionTo('master-page.referral-rule-add-edit', $stateParams);
                init();
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };
    
    $scope.getCoinList = function() {
        return CoinService.getCoinList().then(function(result) {
            $scope.coins = result.data;
            $scope.coins.selectedCoin = result.data[0];
        });
    }
      
    $scope.getRuleList = function() {
        return CoinService.getRuleList().then(function(result) {
            $scope.coinRules = result.coinRules;
            $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleItemId: AppConstants.ReferralRuleItemId});
        });
    }

    init();
    
    }
})();