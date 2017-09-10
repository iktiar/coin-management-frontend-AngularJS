(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('ProductApprovalService', Service);

    function Service($http, $q) {
        var service = {};

        service.getProductApprovalList = getProductApprovalList;
        service.getProductApprovalDetails = getProductApprovalDetails;
        service.updateProductApproval = updateProductApproval;

        return service;

        function getProductApprovalList(approvalStatus) {
            var deferred = $q.defer();
            var url = 'api/product/getallproductapprovallogs?status=' + approvalStatus;
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getProductApprovalDetails(logId) {
            var deferred = $q.defer();
            var url = 'api/product/getproductapprovallogdetails?logId=' + logId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateProductApproval(productApproval) {
            var deferred = $q.defer();
            $http.post('api/product/updateproductapprovallog',
                    {
                        "adminRemarks": productApproval.adminRemarks,
                        "approvalStatus": productApproval.approvalStatus,
                        "logId": productApproval.logId
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

    }
})();