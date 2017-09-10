(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('CashoutApprovalAddEditController', Controller);

    function Controller($scope, CashoutApprovalService, $stateParams, $state, CoinService, $q, AppConstants) {

        function init() {
            $scope.operation = "New";
            $scope.cashoutApprovalLog = {};
            $scope.cashoutApprovalLog.active = true;
            $scope.message = '';
            $scope.logId = $stateParams.logId;
            $scope.paymentMethodTypeId = $stateParams.paymentMethodTypeId;
            $scope.approvalOptions = AppConstants.CashoutApprovalOptions;

        CashoutApprovalService.getCashoutApprovalDetails($scope.logId,  $scope.paymentMethodTypeId).then(function (response) {

                $scope.cashoutApprovalLog = response.cashoutLog;
                $scope.approvalOptions.selectedApprovalStatus = _.find($scope.approvalOptions, {id: $scope.cashoutApprovalLog.cashOutRequestStatus});
            });

        }

        $scope.handleSubmit = function () {
            $scope.updateCashoutApproval();
        }

        $scope.updateCashoutApproval = function () {
            $scope.loading = true;
            $scope.cashoutApprovalLog.logId = $scope.logId;
            $scope.paymentMethodTypeId = $stateParams.paymentMethodTypeId;
            $scope.cashoutApprovalLog.status = $scope.approvalOptions.selectedApprovalStatus.id;
            CashoutApprovalService.updateCashoutApproval($scope.cashoutApprovalLog).then(function (result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };

    init();

        }
})();