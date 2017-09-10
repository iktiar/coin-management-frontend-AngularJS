(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('coinRuleListController', Controller);

    function Controller($scope, CoinRuleService, DefaultService) {
        
        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getCoinRules = function () {
            CoinRuleService.getCoinRuleList().then(function (response) {
                $scope.coinRules = response.coinRules;
            });
        };

        $scope.deleteCoinRule = function (coinRuleId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'coin rule'))) {
                CoinRuleService.deleteCoinRule(coinRuleId).then(function (response) {
                    $scope.getCoinRules();
                    if (response.sucs) {
                        $scope.error = false;
                    } else {
                        $scope.error = true;
                    }
                    $scope.message = response.message;
                    $scope.loading = false;
                });
            }
        };
        
        function init() {
            $scope.getCoinRules();
        }

        init();

    }
})();