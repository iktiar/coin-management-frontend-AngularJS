(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('ProductApprovalAddEditController', Controller);

function Controller($scope, ProductApprovalService, $stateParams, $state, CoinService, $q, AppConstants, ProductService) {
    
    function init() {
        $scope.operation = "New";
        $scope.productApprovalLog = {};
        $scope.productDetails = {};
        $scope.productApprovalLog.active = true;
        $scope.message = '';
        $scope.logId = $stateParams.logId;
        $scope.approvalOptions = AppConstants.ApprovalOptions;
        ProductApprovalService.getProductApprovalDetails($scope.logId).then(function (response) {
            $scope.productApprovalLog = response.productApprovalLog;
            if($scope.productApprovalLog.productId !== undefined){
                $scope.operation = "Update";
                ProductService.getProduct($scope.productApprovalLog.productId).then(function (result) {
                    $scope.productDetails = result;
                    console.log($scope.productDetails);
                });
            }
            $scope.approvalOptions.selectedApprovalStatus = _.find($scope.approvalOptions, {id: $scope.productApprovalLog.approvalStatus});
        });

    }
    
    $scope.handleSubmit = function() {
        $scope.updateProductApproval();
    }
    
    $scope.updateProductApproval = function () {
        $scope.loading = true;
        $scope.productApprovalLog.logId = $scope.logId;
        $scope.productApprovalLog.approvalStatus = $scope.approvalOptions.selectedApprovalStatus.id;
        ProductApprovalService.updateProductApproval($scope.productApprovalLog).then(function (result) {
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