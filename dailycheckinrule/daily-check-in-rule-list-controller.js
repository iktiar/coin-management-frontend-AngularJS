(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('DailyCheckInRuleListController', Controller);

    function Controller($scope, DailyCheckInService) {

        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getDailyCheckInRules = function () {
            DailyCheckInService.getDailyCheckInRuleList().then(function (response) {
                $scope.dailyCheckInRules = response.dailyCheckInRules;
            });
        };

        $scope.deleteDailyCheckInRule = function (ruleDailyCheckInId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'Daily Check In Rule'))) {
                DailyCheckInService.deleteDailyCheckInRule(ruleDailyCheckInId).then(function (response) {
                    $scope.getDailyCheckInRules();
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
            $scope.getDailyCheckInRules();
        }

        init();

    }
})();
