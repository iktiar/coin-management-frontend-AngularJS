(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('AuthenticationService', Service);

    function Service($http, $localStorage, $q) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(email, password) {
            var deferred = $q.defer();

            $http.post('api/authenticate', {email: email, password: password})
                    .success(function (response) {
                        response.message = response.mg;
                        // login successful if there's a token in the response
                        if (response.sucs == true && response.token && response.tokenHash && response.user) {
                            // store username and token in local storage to keep user logged in between page refreshes
                            $localStorage.currentUser = {user: response.user, token: response.token, tokenHash: response.tokenHash};

                            // add jwt token to auth header for all requests made by the $http service
                            $http.defaults.headers.common.Authorization = 'Bearer ' + response.tokenHash;
                        }

                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function Logout() {
            var deferred = $q.defer();

            $http.get('api/logout').success(function (response) {
                response.message = response.mg;
                if (response.sucs == true) {
                    delete $localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = '';
                }

                deferred.resolve(response);
            });
            // remove user from local storage and clear http auth header

            return deferred.promise;
        }
    }
})();