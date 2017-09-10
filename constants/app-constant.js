( function () {
    'use strict';
    
    angular
        .module('coinManagement')
        .constant('AppConstants', {
            UserTypeId: {
                IPVision: 1,
                General: 3
            },  
            UserIdleTimeOut: 900,
            BundleTypeUserCoinPurchase:1,
            DwellTimeRuleItemId:4,
            ReferralRuleItemId:1,
            ShareToSocialMedialRuleItemId:3,
            ProfileCompletionRuleItemId:5,
            DailyCheckInRuleItemId:2,
            ApprovalOptions : [{ "name": "Pending", id: 1 },{ "name": "Approved", id: 2 }, { "name": "Rejected", id: 3 }, { "name": "In Progress", id: 4 }],
            CashoutApprovalOptions : [{ "name": "PENDING", id: 1 },{ "name": "IN PROGRESS", id: 2 }, { "name": "DENIED", id: 3 }, { "name": "APPROVED", id: 4 }],
            ApprovalPending:1,
            ApprovalApproved:2,
            ApprovalRejected:3
        }); 
} )();