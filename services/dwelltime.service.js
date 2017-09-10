(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('DwellTimeService', Service);

    function Service($http, $q) {
        var service = {};

        service.getDwellTimeRuleList = getDwellTimeRuleList;
        service.getDwellTimeRuleDetails = getDwellTimeRuleDetails;
        service.insertDwellTimeRule = insertDwellTimeRule;
        service.updateDwellTimeRule = updateDwellTimeRule;
        service.deleteDwellTimeRule = deleteDwellTimeRule;

        return service;

        function getDwellTimeRuleList() {
            var deferred = $q.defer();
            var url = 'api/dwelltime/getalldwelltimerules';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getDwellTimeRuleDetails(dwellTimeRuleId) {
            var deferred = $q.defer();
            var url = 'api/dwelltime/getdwelltimeruledetails?dwellTimeRuleId=' + dwellTimeRuleId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function insertDwellTimeRule(dwellTimeRule) {
            var deferred = $q.defer();
            $http.post('api/dwelltime/insertdwelltimerule',
                    {
                        "ruleId": dwellTimeRule.ruleId,
                        "coinId": dwellTimeRule.coinId,
                        "dwellTimeInMinute": dwellTimeRule.dwellTimeInMinute,
                        "coinQuantity": dwellTimeRule.coinQuantity,
                        "active": dwellTimeRule.active,
                        "description": dwellTimeRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateDwellTimeRule(dwellTimeRule) {
            var deferred = $q.defer();
            $http.post('api/dwelltime/updatedwelltimerule',
                    {
                        "dwellTimeRuleId": dwellTimeRule.dwellTimeRuleId,
                        "ruleId": dwellTimeRule.ruleId,
                        "coinId": dwellTimeRule.coinId,
                        "dwellTimeInMinute": dwellTimeRule.dwellTimeInMinute,
                        "coinQuantity": dwellTimeRule.coinQuantity,
                        "active": dwellTimeRule.active,
                        "description": dwellTimeRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteDwellTimeRule(dwellTimeRuleId) {
            var deferred = $q.defer();
            $http.post('api/dwelltime/deletedwelltimerule', {'dwellTimeRuleId': dwellTimeRuleId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();