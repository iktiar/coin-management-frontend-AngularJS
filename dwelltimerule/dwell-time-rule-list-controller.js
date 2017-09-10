(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('DwellTimeRuleListController', Controller);

    function Controller($scope, DwellTimeService) {

        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getDwellTimeRules = function () {
            DwellTimeService.getDwellTimeRuleList().then(function (response) {
                $scope.dwellTimeRules = response.dwellTimeRules;
            });
        };

        $scope.deleteDwellTimeRule = function (ruleDwellTimeId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'Dwell Time rule'))) {
                DwellTimeService.deleteDwellTimeRule(ruleDwellTimeId).then(function (response) {
                    $scope.getDwellTimeRules();
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
            $scope.getDwellTimeRules();
        }

        init();

    }
})();
