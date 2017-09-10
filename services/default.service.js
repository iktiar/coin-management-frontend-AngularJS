(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('DefaultService', Service);

    function Service($http, $q) {
        var service = {};
        var defuaultVars = {};

        service.getDefaults = getDefaults;

        return service;

        function getDefaults() {
            var deferred = $q.defer();
            $http.get('api/network/getallnetwork').success(function (response) {
                response.message = response.mg;
                defuaultVars.networkData = response.allNetworks[0];
                deferred.resolve(defuaultVars);
            });

            $http.get('api/coin/getallcoin').success(function (response) {
                response.message = response.mg;
                defuaultVars.coin = response.allCoins[0];
                deferred.resolve(defuaultVars);
            });
            return deferred.promise;
        }
    }
})();


