(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('RuleShareToSocialMediaController', Controller);

    function Controller($scope, RuleShareToSocialMediaService, CoinService, ReferralService, $stateParams, $state, $q, AppConstants) {
    
    $scope.handleSubmit = function() {
    $scope.message = null;
    
    if($scope.ruleShareToSocialMediaId){
         $scope.updateRuleShareToSocialMediaRule();
    }
    else {
        $scope.insertRuleShareToSocialMedia();
      }
    }
    
    $scope.getRuleList = function() {
        return CoinService.getRuleList().then(function(result) {
            $scope.coinRules = result.coinRules;
            $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleItemId: AppConstants.ShareToSocialMedialRuleItemId});
        });
    }
    
    $scope.updateRuleShareToSocialMediaRule = function () {
        $scope.loading = true;
      
        $scope.socialmediaRule.ruleShareToSocialMediaId = $scope.ruleShareToSocialMediaId;
        $scope.socialmediaRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.socialmediaRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.socialmediaRule.dayBetweenRepetitiveShare = $scope.dayBetweenRepetitiveShare;
        $scope.socialmediaRule.coinQuantity = $scope.coinQuantity;
        $scope.socialmediaRule.coinId = $scope.coinTypes.selectedItem.coinId;
        $scope.socialmediaRule.coinName = $scope.coinTypes.selectedItem.coinName;
        $scope.socialmediaRule.socialMediaId = $scope.socialMediaList.selectedItem.socialMediaId;
        $scope.socialmediaRule.socialMediaName = $scope.socialMediaList.selectedItem.socialMediaName;
        $scope.socialmediaRule.description = $scope.description;
       
        RuleShareToSocialMediaService.updateRuleShareToSocialMedia($scope.socialmediaRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertRuleShareToSocialMedia = function () {
        $scope.loading = true;
          
        $scope.socialmediaRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.socialmediaRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        
        $scope.socialmediaRule.dayBetweenRepetitiveShare = $scope.dayBetweenRepetitiveShare;
        $scope.socialmediaRule.coinQuantity = $scope.coinQuantity;
        
        $scope.socialmediaRule.coinId = $scope.coinTypes.selectedItem.coinId;
        $scope.socialmediaRule.coinName = $scope.coinTypes.selectedItem.coinName;
        $scope.socialmediaRule.socialMediaId = $scope.socialMediaList.selectedItem.socialMediaId;
        $scope.socialmediaRule.socialMediaName = $scope.socialMediaList.selectedItem.socialMediaName;
        $scope.socialmediaRule.description = $scope.description;
        
        RuleShareToSocialMediaService.insertRuleShareToSocialMedia($scope.socialmediaRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.ruleShareToSocialMediaId = result.ruleShareToSocialMediaId;
                $state.transitionTo('master-page.rule-share-to-social-media-list', $stateParams);
                init();
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.getCoinList = function() {
             return CoinService.getCoinList().then ( function(result) {
             
              $scope.coinTypes = result.data;
              $scope.coinTypes.selectedItem = result.data[0];
          });
       }
    
    $scope.getShareToSocialMediaList = function() {
             return RuleShareToSocialMediaService.getShareToSocialMediaList().then ( function(result) {
             
              $scope.socialMediaList = result.data;
              $scope.socialMediaList.selectedItem = result.data[0];
          });
       }
    
    
    function init() {
        $scope.socialmediaRule = {};
        $scope.socialmediaRule.active = true;
        $scope.message = '';
        $scope.ruleShareToSocialMediaId = $stateParams.ruleShareToSocialMediaId;
        
        if($scope.ruleShareToSocialMediaId == "new") {
            $scope.ruleShareToSocialMediaId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";
        }
          
     
        RuleShareToSocialMediaService.getRuleShareToSocialMediaById($scope.ruleShareToSocialMediaId).then(function(response) {
              $q.all([
                    $scope.getCoinList(),
                    $scope.getShareToSocialMediaList(),
                    $scope.getRuleList()
                  
                ]).then(function () {
                    if($scope.operation === "Update") {
                    $scope.socialmediaRule = response;
                    
                    $scope.coinId = response.coinId;
                    $scope.socialMediaId = response.socialMediaId;
                    $scope.coinQuantity = response.coinQuantity;
                    $scope.description = response.description;
                    $scope.dayBetweenRepetitiveShare = response.dayBetweenRepetitiveShare;
                    $scope.ruleId = response.ruleId;
                    
                    $scope.coinTypes.selectedItem = _.find($scope.coinTypes, {coinId: $scope.coinId});
                    $scope.socialMediaList.selectedItem = _.find($scope.socialMediaList, {socialMediaId: $scope.socialMediaId});
                    $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleId:  $scope.socialmediaRule.ruleId});    
                    }
                    
                });
            });
       
    }
   
    init();
    
}

})();
