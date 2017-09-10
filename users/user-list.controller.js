(function () {
'use strict';

angular
    .module('coinManagement')
    .controller('UserListController', Controller);
  
  function Controller(UserService, $scope, $localStorage) {
     
     //pagination config setup
     $scope.currentPage = 1;
     $scope.pageSize = 6;             
     
     $scope.data = [];      
          
     $scope.getUserList = function() {
        UserService.getUserList().then(function(result) {
            $scope.data = result.data;
        });
     }
      
      $scope.deleteUser = function (id) {
        $scope.message = null;

        if( $localStorage.currentUser.user.userId == id ) {
            $scope.error = true;
            $scope.message = lang('message.error.user');
            return;
        }    
        
        if (confirm(lang('message.confirm.delete', 'user'))) {
            UserService.deleteUser(id).then(function(result) {
                $scope.getUserList();
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
            });
        }
      }
      
      $scope.getUserList();
    }    
})();

