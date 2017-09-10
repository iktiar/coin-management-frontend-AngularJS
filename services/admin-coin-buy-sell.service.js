(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('AdminCoinBuySellService', Service);

    function Service($http, $q) {
        var service = {};

        service.sellCoin = sellCoin;
        service.buyCoin = buyCoin;

        return service;

        function sellCoin(data) {
            var deferred = $q.defer();

            $http.post('api/coin/sellcoin', data)
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve({sucs: true, message: response.mg});
                        } else {
                            deferred.resolve({sucs: false, message: response.mg});
                        }
                    });

            return deferred.promise;
        }

        function buyCoin(data) {
            var deferred = $q.defer();

            $http.post('api/coin/buycoin', data)
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve({sucs: true, message: response.mg});
                        } else {
                            deferred.resolve({sucs: false, message: response.mg});
                        }
                    });

            return deferred.promise;
        }
    }
})();