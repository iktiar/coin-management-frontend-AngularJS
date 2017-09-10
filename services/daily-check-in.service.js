(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('DailyCheckInService', Service);

    function Service($http, $q) {
        var service = {};

        service.getDailyCheckInDayTypes = getDailyCheckInDayTypes;
        service.getDailyCheckInRuleList = getDailyCheckInRuleList;
        service.getDailyCheckInRuleDetails = getDailyCheckInRuleDetails;
        service.insertDailyCheckInRule = insertDailyCheckInRule;
        service.updateDailyCheckInRule = updateDailyCheckInRule;
        service.deleteDailyCheckInRule = deleteDailyCheckInRule;

        return service;

        function getDailyCheckInDayTypes() {
            var deferred = $q.defer();

            $http.get('api/dailycheckin/getalldailycheckindaytypes')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.dayTypes;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getDailyCheckInRuleList() {
            var deferred = $q.defer();
            var url = 'api/dailycheckin/getalldailycheckinrules';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getDailyCheckInRuleDetails(dailyCheckInRuleId) {
            var deferred = $q.defer();
            var url = 'api/dailycheckin/getdailycheckinruledetails?dailyCheckInRuleId=' + dailyCheckInRuleId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function insertDailyCheckInRule(dailyCheckInRule) {
            var deferred = $q.defer();
            $http.post('api/dailycheckin/insertdailycheckinrule',
                    {
                        "ruleId": dailyCheckInRule.ruleId,
                        "coinId": dailyCheckInRule.coinId,
                        "dailyCheckInDayTypeId": dailyCheckInRule.dailyCheckInDayTypeId,
                        "dayNumber": dailyCheckInRule.dayNumber,
                        "coinQuantity": dailyCheckInRule.coinQuantity,
                        "active": dailyCheckInRule.active,
                        "description": dailyCheckInRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateDailyCheckInRule(dailyCheckInRule) {
            var deferred = $q.defer();
            $http.post('api/dailycheckin/updatedailycheckinrule',
                    {
                        "dailyCheckInRuleId": dailyCheckInRule.dailyCheckInRuleId,
                        "ruleId": dailyCheckInRule.ruleId,
                        "coinId": dailyCheckInRule.coinId,
                        "dailyCheckInDayTypeId": dailyCheckInRule.dailyCheckInDayTypeId,
                        "dayNumber": dailyCheckInRule.dayNumber,
                        "coinQuantity": dailyCheckInRule.coinQuantity,
                        "active": dailyCheckInRule.active,
                        "description": dailyCheckInRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteDailyCheckInRule(dailyCheckInRuleId) {
            var deferred = $q.defer();
            $http.post('api/dailycheckin/deletedailycheckinrule', {'dailyCheckInRuleId': dailyCheckInRuleId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();