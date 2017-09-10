(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('RuleUserProfileCompletionService', Service);

    function Service($http, $q) {
        var service = {};

        service.getAllRuleUserProfileCompletionList = getAllRuleUserProfileCompletionList;
        service.getRuleUserProfileCompletionById = getRuleUserProfileCompletionById;
        service.insertRuleUserProfileCompletion = insertRuleUserProfileCompletion;
        service.updateRuleUserProfileCompletion = updateRuleUserProfileCompletion;
        service.deleteShareToSocialMediaRule = deleteShareToSocialMediaRule;
        service.getAllUserProfileAttributeTypeList = getAllUserProfileAttributeTypeList;

        return service;

        function getAllRuleUserProfileCompletionList() {
            var deferred = $q.defer();

            $http.get('api/ruleuserprofilecompletion/getallruleuserprofilecompletion')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.ruleUserProfileCompletions;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }


        function getAllUserProfileAttributeTypeList() {
            var deferred = $q.defer();

            $http.get('api/ruleuserprofilecompletion/getalluserprofileattributetype')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allProfileAttributeTypes;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getRuleUserProfileCompletionById(ruleUserProfileCompletionId) {

            var deferred = $q.defer();
            $http.get('api/ruleuserprofilecompletion/getruleuserprofilecompletionbyid?ruleUserProfileCompletionId=' + ruleUserProfileCompletionId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.ruleUserProfileCompletion);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function insertRuleUserProfileCompletion(userProfileCompletion) {

            var deferred = $q.defer();
            $http.post('api/ruleuserprofilecompletion/insertruleuserprofilecompletion', {
                "ruleId": userProfileCompletion.ruleId,
                "ruleName": userProfileCompletion.ruleName,
                "dayBetweenRepetitiveShare": userProfileCompletion.dayBetweenRepetitiveShare,
                "coinId": userProfileCompletion.coinId,
                "coinName": userProfileCompletion.coinName,
                "coinQuantity": userProfileCompletion.coinQuantity,
                "active": userProfileCompletion.active,
                "profileAttributeTypeId": userProfileCompletion.profileAttributeTypeId,
                "description": userProfileCompletion.description          
            })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteShareToSocialMediaRule(ruleUserProfileCompletionId) {
            var deferred = $q.defer();
            $http.post('api/ruleuserprofilecompletion/deleteruleuserprofilecompletion', {'ruleUserProfileCompletionId': ruleUserProfileCompletionId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateRuleUserProfileCompletion(userProfileCompletion) {
            var deferred = $q.defer();
            $http.post('api/ruleuserprofilecompletion/updateruleuserprofilecompletion', {
                "ruleUserProfileCompletionId": userProfileCompletion.ruleUserProfileCompletionId,
                "ruleId": userProfileCompletion.ruleId,
                "ruleName": userProfileCompletion.ruleName,
                "dayBetweenRepetitiveShare": userProfileCompletion.dayBetweenRepetitiveShare,
                "coinId": userProfileCompletion.coinId,
                "coinName": userProfileCompletion.coinName,
                "coinQuantity": userProfileCompletion.coinQuantity,
                "active": userProfileCompletion.active,
                "profileAttributeTypeId": userProfileCompletion.profileAttributeTypeId,
                "description": userProfileCompletion.description          
            })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();