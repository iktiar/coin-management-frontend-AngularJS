( function () {
'use strict';

angular.
  module('coinManagement').
  config(['$stateProvider' ,'$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('master-page', {  
          templateUrl: 'master-page.html'
        })
        .state('master-page.home', {
          url: '^/home',  
          templateUrl: 'home-page.html'
        })
        .state('master-page.referral-rule', {
          url: '^/referral-rule',  
          templateUrl: 'referralrule/referral-rule-list.view.html',
          controller: 'ReferralRuleListController',
        })
        .state('master-page.referral-rule-add-edit', {
          url: '^/referral-rule-add-edit/{referralRuleId}',  
          templateUrl: 'referralrule/referral-rule-add-edit.view.html',
          controller: 'ReferralRuleAddEditController',
        })
        .state('master-page.dwell-time-rule', {
          url: '^/dwell-time-rule',  
          templateUrl: 'dwelltimerule/dwell-time-rule-list.view.html',
          controller: 'DwellTimeRuleListController',
        })
        .state('master-page.dwell-time-rule-add-edit', {
          url: '^/dwell-time-rule-add-edit/{dwellTimeRuleId}',  
          templateUrl: 'dwelltimerule/dwell-time-rule-add-edit.view.html',
          controller: 'DwellTimeRuleAddEditController',
        })
        .state('master-page.daily-check-in-rule', {
          url: '^/daily-check-in-rule',  
          templateUrl: 'dailycheckinrule/daily-check-in-rule-list.view.html',
          controller: 'DailyCheckInRuleListController',
        })
        .state('master-page.daily-check-in-rule-add-edit', {
          url: '^/daily-check-in-rule-add-edit/{dailyCheckInRuleId}',  
          templateUrl: 'dailycheckinrule/daily-check-in-rule-add-edit.view.html',
          controller: 'DailyCheckInRuleAddEditController',
        })
        .state('master-page.product-approval-list', {
          url: '^/product-approval-list',  
          templateUrl: 'productapproval/product-approval-list.view.html',
          controller: 'ProductApprovalListController',
        })
        .state('master-page.product-approval-add-edit', {
          url: '^/product-approval-add-edit/{logId}',  
          templateUrl: 'productapproval/product-approval-add-edit.view.html',
          controller: 'ProductApprovalAddEditController',
        })
        .state('master-page.cashout-list', {
          url: '^/cashout-list',  
          templateUrl: 'cashout/cashout-list.view.html',
          controller: 'CashoutApprovalListController',
        })
        .state('master-page.cashout-add-edit', {
          url: '^/cashout-add-edit/{logId}/{paymentMethodTypeId}',  
          templateUrl: 'cashout/cashout-add-edit.view.html',
          controller: 'CashoutApprovalAddEditController',
        })
        .state('master-page.coin-rule', {
          url: '^/coin-rule',  
          templateUrl: 'coinrule/coin-rule-list.html',
          controller: 'coinRuleListController'
        })
        .state('master-page.coin-rule-add-edit', {
          url: '^/coin-rule-add-edit/{coinRuleId}',  
          templateUrl: 'coinrule/coin-rule-add-edit.html',
          controller: 'CoinRuleAddEditController',
        })
        .state('master-page.coin-bundle-list', {
          url: '^/coin-bundle-list',  
          templateUrl: 'coinbundle/coin-bundle-list.html',
          controller: 'CoinBundleListController',
        })
        .state('master-page.coin-bundle-add-edit', {
          url: '^/coin-bundle-add-edit/{coinBundleId}',  
          templateUrl: 'coinbundle/coin-bundle-add-edit.html',
          controller: 'CoinBundleAddEditController',
        })

        .state('master-page.coin-list', {
            url: '^/coin-list',
            templateUrl: 'coins/coin-list.view.html',
            controller: 'CoinListController'
        })
        .state('master-page.coin-add-edit', {
            url: '^/coin-add-edit/{coinId}',
            templateUrl: 'coins/coin-add-edit.view.html',
            controller: 'CoinAddEditController'
        })
        .state('master-page.role-list', {
            url: '^/role-list',
            templateUrl: 'roles/role-list.view.html',
            controller: 'RoleListController'
        })
        .state('master-page.role-add-edit', {
            url: '^/role-add-edit/{roleId}',
            templateUrl: 'roles/role-add-edit.view.html',
            controller: 'RoleAddEditController'
        })
        .state('master-page.product-add-edit', {
            url: '^/product-add-edit/{productId}',
            templateUrl: 'products/product-add-edit.view.html',
            controller: 'ProductAddEditController'
        })
        .state('master-page.bonus-approval', {
            url: '^/bonus-approval',
            templateUrl: 'bonusapproval/bonus-approval.view.html',
            controller: 'BonusApprovalController'
        })
        .state('master-page.coin-sell', {
            url: '^/admin-coin-transaction/{operation}',
            templateUrl: 'admincoinbuysell/coin-buy-sell.view.html',
            controller: 'CoinBuySellController'
        })
        .state('master-page.coin-exchange-rate', {
            url: '^/coin-exchange-rate',
            templateUrl: 'coinexchangerate/coin-exchange-rate.view.html',
            controller: 'CoinExchangeRateController'
        })
        .state('master-page.rule-share-to-social-media-add-edit', {
            url: '^/rule-share-to-social-media-add-edit/{ruleShareToSocialMediaId}',
            templateUrl: 'rulesharetosocialmedia/rule-share-to-social-media-add-edit.html',
            controller: 'RuleShareToSocialMediaController'
        })
        .state('master-page.rule-share-to-social-media-list', {
            url: '^/rule-share-to-social-media-list',
            templateUrl: 'rulesharetosocialmedia/rule-share-to-social-media-list.html',
            controller: 'RuleShareToSocialMediaListController'
        })
        .state('master-page.rule-profile-completion-add-edit', {
            url: '^/rule-profile-completion-add-edit/{ruleUserProfileCompletionId}',
            templateUrl: 'ruleprofilecompletion/rule-profile-completion-add-edit.html',
            controller: 'RuleProfileCompletionController'
        })
        .state('master-page.rule-profile-completion-list', {
            url: '^/rule-profile-completion-list',
            templateUrl: 'ruleprofilecompletion/rule-profile-completion-list.html',
            controller: 'RuleProfileCompletionListController'
        })
        .state('master-page.product-list', {
            url: '^/product-list',
            templateUrl: 'products/product-list.view.html',
            controller: 'ProductListController'
        })    
        .state('master-page.user-list', {
            url: '^/user-list',
            templateUrl: 'users/user-list.view.html',
            controller: 'UserListController'
        })
        .state('master-page.user-add-edit', {
            url: '^/user-add-edit/{userId}',
            templateUrl: 'users/user-add-edit.view.html',
            controller: 'UserAddEditController'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        $httpProvider.interceptors.push(function ($localStorage, $location, $rootScope) {
            return {
                request: function(config) {
                    if($localStorage.currentUser) {
                        if(config.method == "GET") {
                           config.params = config.params ||  {};  
                           config.params.adminUserId = $localStorage.currentUser.user.userId;
                           config.params.tokenHash = $localStorage.currentUser.tokenHash;
                        } else {
                           config.data = config.data ||  {};  
                           config.data.adminUserId = $localStorage.currentUser.user.userId;
                           config.data.tokenHash = $localStorage.currentUser.tokenHash;
                        }
                    }
                    return config;
                },
                
                response: function(response) {
                    var data = response.data;
                    if(data.sucs == false && data.authorized == false) {
                        $rootScope.error = true;
                        $rootScope.message = response.message;
                        delete $localStorage.currentUser;
                        $location.path('/login');
                    }
                    
                    return response;  
                }
            }
        });
    }
  ]).run(run);
  
  function run($rootScope, $http, $location, $localStorage, AppConstants, DefaultService) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.tokenHash;
            DefaultService.getDefaults().then(function (response) {
                $rootScope.networkData = response;
            });
        } else {
            $http.defaults.headers.common.Authorization = '';
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
        
       //checks user's idle time, on time out, logs out

        var IDLE_TIMEOUT = AppConstants.UserIdleTimeOut; //seconds
        var _idleSecondsTimer = null;
        var _idleSecondsCounter = 0;

        document.onclick = function () {
            _idleSecondsCounter = 0;
        };

        document.onmousemove = function () {
            _idleSecondsCounter = 0;
        };

        document.onkeypress = function () {
            _idleSecondsCounter = 0;
        };

        _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

        function CheckIdleTime() {
            _idleSecondsCounter++;
            if (_idleSecondsCounter >= IDLE_TIMEOUT) {
                document.location.href = "/#/login";
            }
        }
    }
  
})();