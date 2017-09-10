(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('CashoutApprovalService', Service);

    function Service($http, $q) {
        var service = {};

        service.getCashoutApprovalList = getCashoutApprovalList;
        service.getCashoutApprovalDetails = getCashoutApprovalDetails;
        service.updateCashoutApproval = updateCashoutApproval;

        return service;

        function getCashoutApprovalList(approvalStatus) {
            var deferred = $q.defer();
            var url = 'api/usercashout/getallcashoutrequest?status=' + approvalStatus;
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getCashoutApprovalDetails(logId, paymentMethodTypeId) {
            var deferred = $q.defer();
            var url = 'api/usercashout/getcashoutdetails?cashoutLogId=' + logId+'&paymentMethodTypeId='+paymentMethodTypeId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateCashoutApproval(cashoutApproval) {
            var deferred = $q.defer();
            $http.post('api/usercashout/updatecashoutrequest',
                    {
                        "transactionId": cashoutApproval.transactionId,
                        "remarks": cashoutApproval.remarks,
                        "status": cashoutApproval.status,
                        "cashOutRequestLogId": cashoutApproval.logId,
                        "paymentMethodTypeId": cashoutApproval.paymentMethodTypeId,
                        "cashAmount": cashoutApproval.cashAmount
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

    }
})();