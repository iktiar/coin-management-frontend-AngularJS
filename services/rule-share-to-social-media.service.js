(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('RuleShareToSocialMediaService', Service);

    function Service($http, $q) {
        var service = {};

        service.getRuleShareToSocialMediaList = getRuleShareToSocialMediaList;
        service.getRuleShareToSocialMediaById = getRuleShareToSocialMediaById;
        service.insertRuleShareToSocialMedia = insertRuleShareToSocialMedia;
        service.updateRuleShareToSocialMedia = updateRuleShareToSocialMedia;
        service.getShareToSocialMediaList = getShareToSocialMediaList;
        service.deleteShareToSocialMediaRule = deleteShareToSocialMediaRule;

        return service;

        function getRuleShareToSocialMediaList() {
            var deferred = $q.defer();

            $http.get('api/rulesharetosocialmedia/getallrulesharetosocialmedia')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allRuleShareToSocialMedias;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }


        function getShareToSocialMediaList() {
            var deferred = $q.defer();

            $http.get('api/rulesharetosocialmedia/getallsocialmedia')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.socialMedias;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getRuleShareToSocialMediaById(ruleShareToSocialMediaId) {

            var deferred = $q.defer();
            $http.get('api/rulesharetosocialmedia/getrulesharetosocialmediabyid?ruleShareToSocialMediaId=' + ruleShareToSocialMediaId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.ruleShareToSocialMedia);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function insertRuleShareToSocialMedia(socialmediaRule) {

            var deferred = $q.defer();
            $http.post('api/rulesharetosocialmedia/insertrulesharetosocialmedia', {
                "ruleId": socialmediaRule.ruleId,
                "ruleName": socialmediaRule.ruleName,
                "dayBetweenRepetitiveShare": socialmediaRule.dayBetweenRepetitiveShare,
                "coinId": socialmediaRule.coinId,
                "coinName": socialmediaRule.coinName,
                "coinQuantity": socialmediaRule.coinQuantity,
                "active": socialmediaRule.active,
                "socialMediaId": socialmediaRule.socialMediaId,
                "socialMediaName": socialmediaRule.socialMediaName,
                "description": socialmediaRule.description
            })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteShareToSocialMediaRule(ruleShareToSocialMediaId) {
            var deferred = $q.defer();
            $http.post('api/rulesharetosocialmedia/deleterulesharetosocialmedia', {'ruleShareToSocialMediaId': ruleShareToSocialMediaId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }


        function updateRuleShareToSocialMedia(socialmediaRule) {
            var deferred = $q.defer();
            $http.post('api/rulesharetosocialmedia/updaterulesharetosocialmedia', {
                "ruleShareToSocialMediaId": socialmediaRule.ruleShareToSocialMediaId,
                "ruleId": socialmediaRule.ruleId,
                "ruleName": socialmediaRule.ruleName,
                "dayBetweenRepetitiveShare": socialmediaRule.dayBetweenRepetitiveShare,
                "coinId": socialmediaRule.coinId,
                "coinName": socialmediaRule.coinName,
                "coinQuantity": socialmediaRule.coinQuantity,
                "active": socialmediaRule.active,
                "socialMediaId": socialmediaRule.socialMediaId,
                "socialMediaName": socialmediaRule.socialMediaName,
                "description": socialmediaRule.description
            })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();