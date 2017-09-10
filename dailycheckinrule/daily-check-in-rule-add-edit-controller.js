(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('DailyCheckInRuleAddEditController', Controller);

function Controller($scope, DailyCheckInService, $stateParams, $state, CoinService, $q, AppConstants) {
    
    function init() {

        $scope.dailyCheckInRule = {};
        $scope.dailyCheckInRule.active = true;
        $scope.message = '';
        $scope.dailyCheckInRuleId = $stateParams.dailyCheckInRuleId;

        if ($scope.dailyCheckInRuleId === "new") {
            $scope.dailyCheckInRuleId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";
        }

        $q.all([
            $scope.getCoinList(),
            $scope.getDailyCheckInDayTypes(),
            $scope.getRuleList()
        ]).then(function () {
            if ($scope.operation === "Update") {
                DailyCheckInService.getDailyCheckInRuleDetails($scope.dailyCheckInRuleId).then(function (response) {
                    $scope.dailyCheckInRule = response.dailyCheckInRuleDetails;
                    $scope.coins.selectedCoin = _.find($scope.coins, {coinId: $scope.dailyCheckInRule.coinId});
                    $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleId: $scope.dailyCheckInRule.ruleId});
                    $scope.dayTypes.selectedDayType = _.find($scope.dayTypes, {dailyCheckInDayTypeId: $scope.dailyCheckInRule.dailyCheckInDayTypeId});
                });
            }
        });

    }
    
    $scope.handleSubmit = function() {
        $scope.message = null;
        
        if($scope.dayTypes.selectedDayType.dailyCheckInDayTypeId == 1 && $scope.dailyCheckInRule.dayNumber != 1){
            $scope.message = "For Daily, Day Number has to be 1!";    
            $scope.dailyCheckInForm.$valid = false;
            $scope.dailyCheckInForm.dayNumber.$invalid = true;
            $scope.error = true;
            return;
        }

        if($scope.dayTypes.selectedDayType.dailyCheckInDayTypeId == 4 && !($scope.dailyCheckInRule.dayNumber >= 1 && $scope.dailyCheckInRule.dayNumber <= 7)){
            $scope.message = "For Day of Week, Day Number has to be between 1 and 7!";    
            $scope.dailyCheckInForm.$valid = false;
            $scope.dailyCheckInForm.dayNumber.$invalid = true;
            $scope.error = true;
            return;
        }

        if($scope.dailyCheckInRuleId)
            $scope.updateDailyCheckInRule();
        else
            $scope.insertDailyCheckInRule();
    }
    
    $scope.updateDailyCheckInRule = function () {
        $scope.loading = true;
        $scope.dailyCheckInRule.dailyCheckInRuleId = $scope.dailyCheckInRuleId;
        $scope.dailyCheckInRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.dailyCheckInRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.dailyCheckInRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.dailyCheckInRule.coinName = $scope.coins.selectedCoin.coinName;
        $scope.dailyCheckInRule.dailyCheckInDayTypeId = $scope.dayTypes.selectedDayType.dailyCheckInDayTypeId;
        $scope.dailyCheckInRule.dailyCheckInDayTypeName = $scope.dayTypes.selectedDayType.dailyCheckInDayTypeName;
        
        DailyCheckInService.updateDailyCheckInRule($scope.dailyCheckInRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertDailyCheckInRule = function () {
        $scope.loading = true;
        $scope.dailyCheckInRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.dailyCheckInRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.dailyCheckInRule.coinId = $scope.coins.selectedCoin.coinId;
        $scope.dailyCheckInRule.coinName = $scope.coins.selectedCoin.coinName;
        $scope.dailyCheckInRule.dailyCheckInDayTypeId = $scope.dayTypes.selectedDayType.dailyCheckInDayTypeId;
        $scope.dailyCheckInRule.dailyCheckInDayTypeName = $scope.dayTypes.selectedDayType.dailyCheckInDayTypeName;

        DailyCheckInService.insertDailyCheckInRule($scope.dailyCheckInRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.dailyCheckInRuleId = result.dailyCheckInRuleId;
                $state.transitionTo('master-page.daily-check-in-rule-add-edit', $stateParams);
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
    
    $scope.getDailyCheckInDayTypes = function() {
        return DailyCheckInService.getDailyCheckInDayTypes().then(function(result) {
            $scope.dayTypes = result.data;
            $scope.dayTypes.selectedDayType = result.data[0];
        });
    }
      
    $scope.getRuleList = function() {
        return CoinService.getRuleList().then(function(result) {
            $scope.coinRules = result.coinRules;
            $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleItemId: AppConstants.DailyCheckInRuleItemId});
        });
    }

    init();
    
    }
})();