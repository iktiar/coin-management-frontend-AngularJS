(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('BonusApprovalController', Controller);

    function Controller($http, $scope) {

        //pagination config setup
        $scope.currentPage = 1;
        $scope.pageSize = 6;
       
        $scope.getUserListForBonusApproval = function () {
             //call to transfer bonus.
            $http.get('api/user/getuserforbonusapproval')
                .success(function (response) {
                    if (response.sucs === true) {                        
                        $scope.userlist = response.user_list;
                        $scope.search_userid = '';
                    } else {
                        console.log('error fetching getUserListForBonusApproval')
                    }
                });
        }
        
        $scope.getUserListForBonusApproval();
        
        $scope.approveBonus = function (quantity, coinId, userid) {
           $scope.show_status_message = false; 
        
            if(isNaN(quantity) || quantity < 1) {
                $scope.coinTransferStatus = false;
                $scope.show_status_message = true;
                $scope.coinTransferStatusMsg = 'Invalid coin amount';
               
                return;
            }
            $scope.loading = true; 
            //call to transfer bonus.
            $http.post('makebonuscoinavailable?userId='+userid+'&coinId='+coinId+'&quantity='+quantity)
                .success(function (response) {
                    $scope.loading = false;
                    $scope.show_status_message = true;
                    if (response.sucs === true) {                        
                       $scope.coinTransferStatus = true;
                       $scope.coinTransferStatusMsg = response.message;
                       //reload after transaction. 
                       $scope.getUserListForBonusApproval();
                    } else {
                          $scope.coinTransferStatus = false;
                          $scope.coinTransferStatusMsg = response.message;
                    }
                });
        }
        
      $scope.clear_search = function () {
          $scope.search = '';
      }
           
    }

})();