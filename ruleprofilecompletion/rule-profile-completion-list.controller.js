(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('RuleProfileCompletionListController', Controller);

    function Controller($scope, RuleUserProfileCompletionService) {
        
        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getRuleUserProfileCompletionList = function () {
            RuleUserProfileCompletionService.getAllRuleUserProfileCompletionList().then(function (response) {
                $scope.ruleUserProfileCompletions = response.ruleUserProfileCompletions;
            });
        };

        $scope.deleteRuleUserProfileCompletion = function (ruleUserProfileCompletionId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'Profile Completion Rule'))) {
                RuleUserProfileCompletionService.deleteShareToSocialMediaRule(ruleUserProfileCompletionId).then(function (response) {
                    if (response.sucs) {
                        $scope.error = false;
                         init();
                    } else {
                        $scope.error = true;
                    }
                    $scope.message = response.message;
                    $scope.loading = false;
                });
            }
        };
        
        function init() {
            $scope.getRuleUserProfileCompletionList();
        }

        init();

    }
})();