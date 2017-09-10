(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('DwellTimeRuleAddEditController', Controller);

function Controller($scope, DwellTimeService, $stateParams, $state, CoinService, $q, AppConstants) {
    
    function init() {

        $scope.dwellTimeRule = {};
        $scope.dwellTimeRule.active = true;
        $scope.message = '';
        $scope.dwellTimeRuleId = $stateParams.dwellTimeRuleId;

        if ($scope.dwellTimeRuleId === "new") {
            $scope.dwellTimeRuleId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";
        }

        $q.all([
            $scope.getCoinList(),
            $scope.getRuleList()
        ]).then(function () {
            if ($scope.operation === "Update") {
                DwellTimeService.getDwellTimeRuleDetails($scope.dwellTimeRuleId).then(function (response) {
                    $scope.dwellTimeRule = response.dwellTimeRuleDetails;
                    $scope.coins.selectedCoin = _.find($scope.coins, {coinId: $scope.dwellTimeRule.coinId});
                    $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleId: $scope.dwellTimeRule.ruleId});
                });
            }
        });

    }
    
    $scope.handleSubmit = function() {
        $scope.message = null;
        if($scope.dwellTimeRuleId)
            $scope.updateDwellTimeRule();
        else
            $scope.insertDwellTimeRule();
    }
    
    $scope.updateDwellTimeRule = function () {
        $scope.loading = true;
        $scope.dwellTimeRule.dwellTimeRuleId = $scope.dwellTimeRuleId;
        $scope.dwellTimeRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.dwellTimeRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.dwellTimeRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.dwellTimeRule.coinName = $scope.coins.selectedCoin.coinName;
        
        DwellTimeService.updateDwellTimeRule($scope.dwellTimeRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertDwellTimeRule = function () {
        $scope.loading = true;
        $scope.dwellTimeRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.dwellTimeRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.dwellTimeRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.dwellTimeRule.coinName = $scope.coins.selectedCoin.coinName;

        DwellTimeService.insertDwellTimeRule($scope.dwellTimeRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.dwellTimeRuleId = result.dwellTimeRuleId;
                $state.transitionTo('master-page.dwell-time-rule-add-edit', $stateParams);
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
            $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleItemId: AppConstants.DwellTimeRuleItemId});
        });
    }

    init();
    
    }
})();