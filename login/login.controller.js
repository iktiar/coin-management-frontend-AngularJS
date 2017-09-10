(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('LoginController', Controller);

    function Controller($location, AuthenticationService, $rootScope, $localStorage, $http) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout().then(function (result) {
                if(result.sucs == false) {
                    if($localStorage.currentUser){
                        $rootScope.error = true;
                        $rootScope.message = result.message;
                }
                    $location.path('/login');
                    
                    delete $localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = '';
                }
            });            
        };

        function login() {
            $rootScope.error = false;
            $rootScope.message = '';
            vm.loading = true;            
            AuthenticationService.Login(vm.email, CryptoJS.SHA256(vm.password).toString()).then(function (result) {
                if (result.sucs === true) {
                    $location.path('/home');
                } else {
                    vm.error = 'Email or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }

})();