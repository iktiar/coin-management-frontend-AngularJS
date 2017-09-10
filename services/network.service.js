(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('NetworkService', Service);

    function Service($http, $q) {
        var service = {};

        service.getNetworkList = getNetworkList;

        return service;

        function getNetworkList() {
            var deferred = $q.defer();

            $http.get('api/network/getallnetwork')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allNetworks;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }
    }
})();