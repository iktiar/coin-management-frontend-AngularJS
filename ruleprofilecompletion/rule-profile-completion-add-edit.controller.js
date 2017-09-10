(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('RuleProfileCompletionController', Controller);

    function Controller($scope, RuleUserProfileCompletionService, CoinService, ReferralService, $stateParams, $state, $q, AppConstants) {
    
    $scope.handleSubmit = function() {
    $scope.message = null;
    
    if($scope.ruleUserProfileCompletionId){
         $scope.updateRuleUserProfileCompletionRule();
    }
    else {
        $scope.insertRuleUserProfileCompletion();
      }
    }
    
    $scope.getRuleList = function() {
        return CoinService.getRuleList().then(function(result) {
            $scope.coinRules = result.coinRules;
            $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleItemId: AppConstants.ProfileCompletionRuleItemId});
        });
    }
    
    $scope.updateRuleUserProfileCompletionRule = function () {
        $scope.loading = true;
      
        $scope.profileCompletionRule.ruleUserProfileCompletionId = $scope.ruleUserProfileCompletionId;
        $scope.profileCompletionRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.profileCompletionRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.profileCompletionRule.coinQuantity = $scope.coinQuantity;
        $scope.profileCompletionRule.coinId = $scope.coinTypes.selectedItem.coinId;
        $scope.profileCompletionRule.coinName = $scope.coinTypes.selectedItem.coinName;
        $scope.profileCompletionRule.profileAttributeTypeId = $scope.allUserProfileAttributeTypeList.selectedItem.attributeTypeId;
       
        RuleUserProfileCompletionService.updateRuleUserProfileCompletion($scope.profileCompletionRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
            } else {
                $scope.error = true;
            }
            $scope.message = result.message;
            $scope.loading = false;
        });
    };

    $scope.insertRuleUserProfileCompletion = function () {
        $scope.loading = true;
         
        $scope.profileCompletionRule.ruleId = $scope.coinRules.selectedRule.ruleId;
        $scope.profileCompletionRule.ruleName = $scope.coinRules.selectedRule.ruleName;
        $scope.profileCompletionRule.coinQuantity = $scope.coinQuantity;
        $scope.profileCompletionRule.coinId = $scope.coinTypes.selectedItem.coinId;
        $scope.profileCompletionRule.coinName = $scope.coinTypes.selectedItem.coinName;
        $scope.profileCompletionRule.profileAttributeTypeId = $scope.allUserProfileAttributeTypeList.selectedItem.attributeTypeId;
        
        RuleUserProfileCompletionService.insertRuleUserProfileCompletion($scope.profileCompletionRule).then(function (result) {
            if (result.sucs) {
                $scope.error = false;
                $stateParams.rulesharetosocialmediaId = result.rulesharetosocialmediaId;
                $state.transitionTo('master-page.rule-profile-completion-list', $stateParams);
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
    
    $scope.getAllUserProfileAttributeTypeList = function() {
             return RuleUserProfileCompletionService.getAllUserProfileAttributeTypeList().then ( function(result) {
            
              $scope.allUserProfileAttributeTypeList = result.data;
              $scope.allUserProfileAttributeTypeList.selectedItem = result.data[0];
          });
       }
    
    
    function init() {
        $scope.profileCompletionRule = {};
        $scope.profileCompletionRule.active = true;
        $scope.message = '';
        $scope.ruleUserProfileCompletionId = $stateParams.ruleUserProfileCompletionId;
        
        if($scope.ruleUserProfileCompletionId == "new") {
            $scope.ruleUserProfileCompletionId = 0;
            $scope.operation = "Create";
        } else {
            $scope.operation = "Update";
        }
          
     
        RuleUserProfileCompletionService.getRuleUserProfileCompletionById($scope.ruleUserProfileCompletionId).then(function(response) {
              $q.all([
                    $scope.getCoinList(),
                    $scope.getAllUserProfileAttributeTypeList(),
                    $scope.getRuleList()
                  
                ]).then(function () {
                    if($scope.operation === "Update") {
                    $scope.profileCompletionRule = response;
                    
                    $scope.coinId = response.coinId;
                    $scope.socialMediaId = response.socialMediaId;
                    $scope.coinQuantity = response.coinQuantity;
                    $scope.dayBetweenRepetitiveShare = response.dayBetweenRepetitiveShare;
                    $scope.ruleId = response.ruleId;
                    $scope.profileAttributeTypeId = response.profileAttributeTypeId;
                    
                    $scope.coinTypes.selectedItem = _.find($scope.coinTypes, {coinId: $scope.coinId});
                    $scope.allUserProfileAttributeTypeList.selectedItem = _.find($scope.allUserProfileAttributeTypeList, {attributeTypeId: $scope.profileAttributeTypeId});
                    $scope.coinRules.selectedRule = _.find($scope.coinRules, {ruleId:  $scope.profileCompletionRule.ruleId});    
                    }
                    
                });
            });
       
    }
   
    init();
    
}

})();
