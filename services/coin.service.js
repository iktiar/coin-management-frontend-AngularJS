(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('CoinService', Service);

    function Service($http, $q) {
        var service = {};

        service.getCoinList = getCoinList;
        service.getRuleList = getRuleList;
        service.insertCoin = insertCoin;
        service.deleteCoin = deleteCoin;
        service.getCoin = getCoin;
        service.updateCoin = updateCoin;

        return service;

        function getCoinList() {
            var deferred = $q.defer();

            $http.get('api/coin/getallcoin')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.allCoins;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getRuleList() {
            var deferred = $q.defer();
            $http.get('api/coinrule/getcoinrules')

                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }


        function insertCoin(coinName, baseUnit, active) {
            var deferred = $q.defer();
            $http.post('api/coin/insertcoin', {"coinName": coinName, "baseUnit": baseUnit, "active": active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteCoin(coinId) {
            var deferred = $q.defer();
            $http.post('api/coin/deletecoin', {"coinId": coinId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getCoin(coinId) {
            var deferred = $q.defer();
            $http.get('api/coin/getcoin?coinId=' + coinId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.coin);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function updateCoin(coinId, coinName, baseUnit, active) {
            var deferred = $q.defer();
            $http.post('api/coin/updatecoin', {"coinId": coinId, "coinName": coinName, "baseUnit": baseUnit, "active": active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();