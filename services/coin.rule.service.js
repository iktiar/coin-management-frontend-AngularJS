(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('CoinRuleService', Service);

    function Service($http, $q) {
        var service = {};

        service.getRuleItemList = getRuleItemList;
        service.getCoinRuleDetails = getCoinRuleDetails;
        service.insertCoinRule = insertCoinRule;
        service.updateCoinRule = updateCoinRule;
        service.deleteCoinRule = deleteCoinRule;
        service.getCoinRuleList = getCoinRuleList;

        return service;

        function getRuleItemList() {
            var deferred = $q.defer();
            var url = 'api/coinrule/getcoinruleitem';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getCoinRuleDetails(ruleId) {
            var deferred = $q.defer();
            var url = 'api/coinrule/getcoinruledetails?coinRuleId=' + ruleId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function insertCoinRule(coinRule) {
            var deferred = $q.defer();
            $http.post('api/coinrule/insertcoinrule', {"ruleName": coinRule.ruleName, "ruleItemId": coinRule.ruleItemId, "active": coinRule.active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateCoinRule(coinRule) {
            var deferred = $q.defer();
            $http.post('api/coinrule/updatecoinrule', {"ruleId": coinRule.coinRuleId, "ruleName": coinRule.ruleName, "ruleItemId": coinRule.ruleItemId, "active": coinRule.active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }


        function getCoinRuleList() {
            var deferred = $q.defer();
            var url = 'api/coinrule/getcoinrules';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteCoinRule(coinRuleId) {
            var deferred = $q.defer();
            var referralRuleData = {'coinRuleId': coinRuleId}
            $http.post('api/coinrule/deletecoinrule', referralRuleData)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();