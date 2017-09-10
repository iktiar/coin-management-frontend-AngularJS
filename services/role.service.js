(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('RoleService', Service);

    function Service($http, $q) {
        var service = {};

        service.getRoleList = getRoleList;
        service.insertRole = insertRole;
        service.deleteRole = deleteRole;
        service.getRoleDetails = getRoleDetails;
        service.updateRole = updateRole;

        return service;

        function getRoleList() {
            var deferred = $q.defer();

            $http.get('api/role/getallroles')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allRoles;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function insertRole(roleName, active) {
            var deferred = $q.defer();
            $http.post('api/role/insertrole', {"roleName": roleName, "active": active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteRole(roleId) {
            var deferred = $q.defer();
            $http.post('api/role/deleterole', {"roleId": roleId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getRoleDetails(roleId) {
            var deferred = $q.defer();
            $http.get('api/role/getroledetails?roleId=' + roleId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.roleDetails);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function updateRole(roleId, roleName, active) {
            var deferred = $q.defer();
            $http.post('api/role/updaterole', {"roleId": roleId, "roleName": roleName, "active": active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();