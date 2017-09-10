(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('UserAddEditController', Controller);

    function Controller($scope, $stateParams, $state, UserService) {
        function init () {
            $scope.active = true;
            $scope.message = '';
            $scope.userId = $stateParams.userId;

            if($scope.userId == "new") {
                $scope.userId = 0;
                $scope.operation = "Create";
            } else {
              $scope.operation = "Update";
            }
            
            $scope.getUserTypeList().then(function () {
                if($scope.operation == "Update") {
                    UserService.getUser($scope.userId).then(function(result) {
                        $scope.email = result.email;
                        $scope.password = result.password;
                        $scope.oldPassword = result.password;
                        $scope.active = result.active;
                        $scope.firstName = result.firstName;
                        $scope.lastName = result.lastName;
                        $scope.mobileNo = result.mobileNo;
                        $scope.address = result.address;
                        $scope.userTypeList.selectedItem = _.find($scope.userTypeList, function(data){ return data.userTypeId == result.userTypeId});
                    });
                }
            });
        }
        
        $scope.getUserTypeList = function() {
            return UserService.getUserTypeList().then(function(result) {
                $scope.userTypeList = result.data;
                $scope.userTypeList.selectedItem = result.data[0];
            }); 
        }
        
        $scope.handleSubmit = function() {
            $scope.message = null;
            if($scope.userId)
                $scope.updateUser();
            else
                $scope.insertUser();
        }
        
        $scope.updateUser = function () {
            $scope.loading = true;
            var password = $scope.oldPassword;
            if( $scope.oldPassword != $scope.password ) {
                password = CryptoJS.SHA256($scope.password).toString();
            }
            UserService.updateUser($scope.userId, $scope.email, password, 
                                   $scope.active, $scope.firstName, $scope.lastName, $scope.mobileNo,
                                   $scope.address, $scope.userTypeList.selectedItem.userTypeId).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        $scope.insertUser = function() {
            $scope.loading = true;            
            UserService.insertUser($scope.email, CryptoJS.SHA256($scope.password).toString(), 
                                   $scope.active, $scope.firstName, $scope.lastName, $scope.mobileNo,
                                   $scope.address, $scope.userTypeList.selectedItem.userTypeId).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                    $stateParams.userId = result.userId;
                    $state.transitionTo('master-page.user-add-edit', $stateParams);
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