(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('ProductApprovalListController', Controller);

    function Controller($scope, ProductApprovalService, AppConstants) {

        $scope.currentPage = 1;
        $scope.pageSize = 6;
        $scope.approvalOptions = AppConstants.ApprovalOptions;
        $scope.approvalOptions.selectedApprovalStatus = _.find($scope.approvalOptions, {id: AppConstants.ApprovalPending});
        
        $scope.getProductApprovalList = function (status) {
            console.log(status.id)
            ProductApprovalService.getProductApprovalList(status.id).then(function (response) {
                $scope.productApprovalLogs = response.productApprovalLogs;
            });
        };

        function init() {
            $scope.getProductApprovalList($scope.approvalOptions.selectedApprovalStatus);
        }

        init();

    }
})();
