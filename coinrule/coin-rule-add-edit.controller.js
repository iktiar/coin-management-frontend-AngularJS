(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('CoinRuleAddEditController', Controller);

    function Controller($scope, CoinRuleService, $stateParams, $state, $q) {
    
    $scope.handleSubmit = function() {
    $scope.message = null;
    if($scope.coinRuleId)
        $scope.updateCoinRule();
    else
        $scope.insertCoinRule();
    }
    
    $scope.updateCoinRule = function () {
        $scope.loading = true;
        $scope.coinRule.coinRuleId = $scope.coinRuleId;
        $scope.coinRule.ruleItemId = $scope.ruleItems.selectedItem.ruleItemId;
        CoinRuleService.updateCoinRule($scope.coinRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertCoinRule = function () {
        $scope.loading = true;
        $scope.coinRule.ruleItemId = $scope.ruleItems.selectedItem.ruleItemId;
        CoinRuleService.insertCoinRule($scope.coinRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.coinRuleId = result.coinRuleId;
                $state.transitionTo('master-page.coin-rule-add-edit', $stateParams);
                init();
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.getRuleItemList = function() {
        return CoinRuleService.getRuleItemList().then(function(result) {
            $scope.ruleItems = result.ruleItems;
            $scope.ruleItems.selectedItem = result.ruleItems[0];
        });
    }

    
    function init() {
        $scope.coinRule = {};
        $scope.coinRule.active = true;
        $scope.message = '';
        $scope.coinRuleId = $stateParams.coinRuleId;

        if($scope.coinRuleId == "new") {
            $scope.coinRuleId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";

          CoinRuleService.getCoinRuleDetails($scope.coinRuleId).then(function(response) {
              $q.all([
                    $scope.getRuleItemList()
                ]).then(function () {
                    $scope.coinRule = response.coinRule;
                    $scope.ruleItems.selectedItem = _.find($scope.ruleItems, {ruleItemId: $scope.coinRule.ruleItemId});
                });
            });
        }
            
        $scope.getRuleItemList();
    }
    
    init();
    
}

})();