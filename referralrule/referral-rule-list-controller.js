(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('ReferralRuleListController', Controller);

    function Controller($scope, ReferralService) {

        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getReferralRule = function () {
            ReferralService.getReferralRuleList().then(function (response) {
                $scope.referralRules = response.referralRules;
            });
        };

        $scope.deleteReferralRule = function (ruleReferralId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'referral rule'))) {
                ReferralService.deleteReferralRule(ruleReferralId).then(function (response) {
                    $scope.getReferralRule();
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
            $scope.getReferralRule();
        }

        init();

    }
})();