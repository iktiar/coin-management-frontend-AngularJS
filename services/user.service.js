(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.getUserList = getUserList;
        service.deleteUser = deleteUser;
        service.getUserTypeList = getUserTypeList;
        service.getUser = getUser;
        service.insertUser = insertUser;
        service.updateUser = updateUser;

        return service;

        function getUserList() {
            var deferred = $q.defer();

            $http.get('api/systemuser/getalluser')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allUsers;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function deleteUser(userId) {
            var deferred = $q.defer();
            $http.post('api/systemuser/deleteuser', {"userId": userId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getUserTypeList() {
            var deferred = $q.defer();

            $http.get('api/systemuser/getallusertype')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allUserTypes;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getUser(userId) {
            var deferred = $q.defer();
            $http.get('api/systemuser/getuser?userId=' + userId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.user);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function insertUser(email, password, active, firstName, lastName, mobileNo, address, userTypeId) {
            var deferred = $q.defer();
            $http.post('api/systemuser/insertuser', {"email": email, "password": password, "active": active,
                "firstName": firstName, "lastName": lastName, "mobileNo": mobileNo,
                "address": address, "userTypeId": userTypeId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateUser(userId, email, password, active, firstName, lastName, mobileNo, address, userTypeId) {
            var deferred = $q.defer();
            $http.post('api/systemuser/updateuser', {"userId": userId, "email": email, "password": password, "active": active,
                "firstName": firstName, "lastName": lastName, "mobileNo": mobileNo,
                "address": address, "userTypeId": userTypeId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();