(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('CashoutApprovalListController', Controller);

    function Controller($scope, $filter, CashoutApprovalService, AppConstants) {

        $scope.currentPage = 1;
        $scope.pageSize = 6;
        $scope.approvalOptions = AppConstants.CashoutApprovalOptions;
        $scope.approvalOptions.selectedApprovalStatus = _.find($scope.approvalOptions, {id: AppConstants.ApprovalPending});

        $scope.getCashoutApprovalList = function (status) {
            CashoutApprovalService.getCashoutApprovalList(status.id).then(function (response) {
                $scope.cashoutApprovalLogs = response.allRequest;
            });
        };

        function init() {
            $scope.getCashoutApprovalList($scope.approvalOptions.selectedApprovalStatus);
        }

        $scope.reset = function () {
            $scope.fromDate = null;
            $scope.toDate = null;
            $scope.search = '';
            init();

        }

        $scope.filterByDate = function (status) {

            var filtered = [];
            var from_date = Date.parse($scope.fromDate);
            var to_date = Date.parse($scope.toDate);
            var created = null;

            CashoutApprovalService.getCashoutApprovalList(status.id).then(function (response) {
                $scope.cashoutApprovalLogs = response.allRequest;
                if ((from_date > to_date) || (!from_date || !to_date)) {
                    return;
                }
                angular.forEach($scope.cashoutApprovalLogs, function (item) {
                    created = new Date(Date.parse(item.created));
                    created.setHours(0, 0, 0, 0);
                    if (created >= from_date && created <= to_date) {
                        filtered.push(item);
                    }
                });

                $scope.cashoutApprovalLogs = filtered;

            });

        }
        init();

    }
})();
