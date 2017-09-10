(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('RuleShareToSocialMediaListController', Controller);

    function Controller($scope, RuleShareToSocialMediaService, DefaultService) {
        
        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getRuleShareToSocialMediaList = function () {
            RuleShareToSocialMediaService.getRuleShareToSocialMediaList().then(function (response) {
                $scope.ruleShareToSocialMedias = response.ruleShareToSocialMedias;
            });
        };

        $scope.deleteShareToSocialMediaRule = function (rulesharetosocialmediaRuleId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'Share To Social Media Rule'))) {
                RuleShareToSocialMediaService.deleteShareToSocialMediaRule(rulesharetosocialmediaRuleId).then(function (response) {
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
            $scope.getRuleShareToSocialMediaList();
        }

        init();

    }
})();