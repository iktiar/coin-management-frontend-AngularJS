(function () {
'use strict';

angular
    .module('coinManagement')
    .controller('CoinListController', Controller);
  
  function Controller(CoinService, $scope) {
     
     //pagination config setup
     $scope.currentPage = 1;
     $scope.pageSize = 6;             
     
     $scope.data = [];      
          
      $scope.getCoinList = function() {
        CoinService.getCoinList().then(function(result) {
            $scope.data = result.data;
        });
      }
      
      $scope.deleteCoin = function (id) {
        $scope.message = null;
        
        if (confirm(lang('message.confirm.delete', 'coin'))) {
            CoinService.deleteCoin(id).then(function(result) {
                $scope.getCoinList();
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
            });
        }
      }
      
      $scope.getCoinList();
    }    
})();