(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('ReferralService', Service);

    function Service($http, $q) {
        var service = {};

        service.getReferralRuleList = getReferralRuleList;
        service.getReferralRuleDetails = getReferralRuleDetails;
        service.insertReferralRule = insertReferralRule;
        service.updateReferralRule = updateReferralRule;
        service.deleteReferralRule = deleteReferralRule;

        return service;

        function getReferralRuleList() {
            var deferred = $q.defer();
            var url = 'api/referral/getreferralrules';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getReferralRuleDetails(referralId) {
            var deferred = $q.defer();
            var url = 'api/referral/getreferralruledetails?ruleReferralId=' + referralId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function insertReferralRule(referralRule) {
            var deferred = $q.defer();
            $http.post('api/referralrule/insertreferralrule',
                    {
                        "ruleId": referralRule.ruleId,
                        "coinId": referralRule.coinId,
                        "connectionLevel": referralRule.connectionLevel,
                        "referredNumber": referralRule.referredNumber,
                        "coinQuantity": referralRule.coinQuantity,
                        "active": referralRule.active,
                        "description": referralRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateReferralRule(referralRule) {
            var deferred = $q.defer();
            $http.post('api/referralrule/updatereferralrule',
                    {
                        "referralRuleId": referralRule.referralRuleId,
                        "ruleId": referralRule.ruleId,
                        "coinId": referralRule.coinId,
                        "connectionLevel": referralRule.connectionLevel,
                        "referredNumber": referralRule.referredNumber,
                        "coinQuantity": referralRule.coinQuantity,
                        "active": referralRule.active,
                        "description": referralRule.description
                    })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteReferralRule(ruleReferralId) {
            var deferred = $q.defer();
            $http.post('api/referral/deletereferralrule', {'ruleReferralId': ruleReferralId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();