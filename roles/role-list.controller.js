(function () {
'use strict';

angular
    .module('coinManagement')
    .controller('RoleListController', Controller);
  
  function Controller(RoleService, $scope) {
     
     //pagination config setup
     $scope.currentPage = 1;
     $scope.pageSize = 6;             
     
     $scope.data = [];      
          
      $scope.getRoleList = function() {
        RoleService.getRoleList().then(function(result) {
            $scope.data = result.data;
        });
      }
      
      $scope.deleteRole = function (id) {
        $scope.message = null;
        
        if (confirm(lang('message.confirm.delete', 'role'))) {
            RoleService.deleteRole(id).then(function(result) {
                $scope.getRoleList();
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
            });
        }
      }
      
      $scope.getRoleList();
    }    
})();