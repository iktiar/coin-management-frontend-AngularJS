(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('RoleAddEditController', Controller);

    function Controller($scope, $stateParams, $state, RoleService) {
        function init () {
            $scope.active = true;
            $scope.message = '';
            $scope.roleId = $stateParams.roleId;

            if($scope.roleId == "new") {
                $scope.roleId = 0;
                $scope.operation = "Create";
            } else {
              $scope.operation = "Update";

              RoleService.getRoleDetails($scope.roleId).then(function(result) {
                 $scope.roleName = result.roleName;
                 $scope.active = result.active;
              });
            }
        }
        
        $scope.handleSubmit = function() {
            $scope.message = null;
            if($scope.roleId)
                $scope.updateRole();
            else
                $scope.insertRole();
        }
        
        $scope.updateRole = function () {
            $scope.loading = true;            
            RoleService.updateRole($scope.roleId, $scope.roleName, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        $scope.insertRole = function() {
            $scope.loading = true;            
            RoleService.insertRole($scope.roleName, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                    $stateParams.roleId = result.roleId;
                    $state.transitionTo('master-page.role-add-edit', $stateParams);
                    init();
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        init();
    }

})();