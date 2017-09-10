(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('CoinBundleService', Service);

    function Service($http, $q) {
        var service = {};

        service.getRuleItemList = getRuleItemList;
        service.getCoinBundleDetails = getCoinBundleDetails;
        service.insertCoinBundle = insertCoinBundle;
        service.updateCoinBundle = updateCoinBundle;
        service.deleteCoinBundle = deleteCoinBundle;
        service.getCoinBundleList = getCoinBundleList;
        service.getBundleTypes = getBundleTypes;
        service.getPaymentMethods = getPaymentMethods;

        return service;

        function getPaymentMethods() {
            var deferred = $q.defer();
            $http.get('api/paymentmethodtype/getallpaymentmethodtype')

                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getBundleTypes() {
            var deferred = $q.defer();
            $http.get('api/coinbundle/getbundletypes')

                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getRuleItemList() {
            var deferred = $q.defer();
            var url = 'api/coinbundle/getcoinbundleitem';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getCoinBundleDetails(coinBundleId) {
            var deferred = $q.defer();
            var url = 'api/coinbundle/getcoinbundledetails?coinBundleId=' + coinBundleId;

            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function insertCoinBundle(coinBundle) {
            var deferred = $q.defer();
            $http.post('api/coinbundle/insertcoinbundle', {"externalProductId": coinBundle.externalProductId, "networkId": coinBundle.networkId, "paymentMethodTypeId": coinBundle.paymentMethodTypeId, "currencyISOCode": coinBundle.isoCode, "bundlePrice": coinBundle.bundlePrice, "bundleTypeId": coinBundle.bundleTypeId, "coinId": coinBundle.coinId, "coinQuantity": coinBundle.coinQuantity, "freeCoinQuantity": coinBundle.freeCoinQuantity, "customMessage": coinBundle.customMessage, "isApplicableForFirstTime": coinBundle.isApplicableForFirstTime, "active": coinBundle.active, })
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function updateCoinBundle(coinBundle) {
            var deferred = $q.defer();
            $http.post('api/coinbundle/updatecoinbundle', {"externalProductId": coinBundle.externalProductId, "networkId": coinBundle.networkId, "paymentMethodTypeId": coinBundle.paymentMethodTypeId, "currencyISOCode": coinBundle.isoCode, "bundlePrice": coinBundle.bundlePrice, "coinBundleId": coinBundle.coinBundleId, "bundleTypeId": coinBundle.bundleTypeId, "coinId": coinBundle.coinId, "coinQuantity": coinBundle.coinQuantity, "freeCoinQuantity": coinBundle.freeCoinQuantity, "customMessage": coinBundle.customMessage, "isApplicableForFirstTime": coinBundle.isApplicableForFirstTime, "active": coinBundle.active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }


        function getCoinBundleList() {
            var deferred = $q.defer();
            var url = 'api/coinbundle/getallcoinbundle';
            $http.get(url)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteCoinBundle(coinBundleId) {
            var deferred = $q.defer();
            var referralRuleData = {'coinBundleId': coinBundleId}
            $http.post('api/coinbundle/deletecoinbundle', referralRuleData)
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();