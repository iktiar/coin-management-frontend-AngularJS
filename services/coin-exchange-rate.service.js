(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('CoinExchangeRateService', Service);

    function Service($http, $q) {
        var service = {};

        service.getCoinExchangeRateByParams = getCoinExchangeRateByParams;
        service.getCoinExchangeRateByNetworkIdCoinId = getCoinExchangeRateByNetworkIdCoinId;
        service.insertUpdateCoinExchageRate = insertUpdateCoinExchageRate;
        service.getInternationalCurrencyExchangeRate = getInternationalCurrencyExchangeRate;

        return service;

        function getCoinExchangeRateByParams(networkId, currencyISOCode, coinId) {
            var deferred = $q.defer();

            $http.get('api/exchangerate/getcoinexchangeratebyparams?networkId=' + networkId + '&currencyISOCode=' +
                    currencyISOCode + '&coinId=' + coinId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.coinExchangeRate;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getCoinExchangeRateByNetworkIdCoinId(networkId, coinId) {
            var deferred = $q.defer();

            $http.get('api/exchangerate/getcoinexchangeratebynetworkidcoinid?networkId=' + networkId + '&coinId=' + coinId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.coinExchangeRate;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function insertUpdateCoinExchageRate(updateList, insertList) {
            var deferred = $q.defer();

            $http.post('api/exchangerate/insertupdatecoinexchangerate', {"updateList": updateList, "insertList": insertList})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getInternationalCurrencyExchangeRate() {
            var deferred = $q.defer();

            window.jsonp_callback = function (response) {
                response.data = response.rates;
                response.message = response.mg;
                deferred.resolve(response);
            };

            $http.jsonp('https://openexchangerates.org/api/latest.json?app_id=acbb2b42792b41fc8417460612c61542&callback=jsonp_callback', {});

            //$http.jsonp('https://openexchangerates.org/api/latest.json?app_id=753ae803ffec4fdb91f5798412bb05a7&callback=jsonp_callback', {});

            return deferred.promise;
        }
    }

})();