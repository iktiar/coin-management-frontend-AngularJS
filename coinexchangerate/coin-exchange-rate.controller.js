(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('CoinExchangeRateController', Controller);

    function Controller($scope, $q, NetworkService, CoinService, CoinExchangeRateService) {
        
        function init() {
            $scope.loadingCoinExchangeRate = true;
            $scope.loadingHandleSubmit = true;
            $scope.loading = true;
            
            $q.all([
                $scope.getNetworkList(),
                $scope.getCoinList(),
                $scope.getInternationalCurrencyExchangeRate()
            ]).then(function () {
                $scope.calcualteInternationalCurrencyExchangeRateRatio();
                $scope.getCoinExchangeRateByNetworkIdCoinId().then(function () {
                    $scope.loadingCoinExchangeRate = false;
                    $scope.loading = false;
                    $scope.loadingHandleSubmit = false;
                } );
            });
        }
        
        $scope.getCoinExchangeRateByNetworkIdCoinId = function () {
            return CoinExchangeRateService
                    .getCoinExchangeRateByNetworkIdCoinId($scope.networkList.selectedItem.networkId, $scope.coinList.selectedItem.coinId)
                    .then(function (result) {
                        $scope.networkCurrency = _.find(result.data, function(data){ return data.isoCode == $scope.networkList.selectedItem.currencyISOCode});
                        result.data = _.without(result.data, _.find(result.data, $scope.networkCurrency));
                        result.data.unshift($scope.networkCurrency);
                        
                        $scope.coinExchangeRates = result.data;
                        
                        _.forEach($scope.coinExchangeRates, function (coinExchangeRate) {
                            _.defaults(coinExchangeRate, 
                                {
                                    buyRate: 0, 
                                    networkId: $scope.networkList.selectedItem.networkId,
                                    coinId: $scope.coinList.selectedItem.coinId,
                                    active: true
                                }
                            );
                        });
                    });
        };
        
        $scope.insertUpdateCoinExchageRate = function (updateList, insertList) {  
            return CoinExchangeRateService.insertUpdateCoinExchageRate(updateList, insertList).then( function (result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
            } );
        };
        
        $scope.getNetworkList = function() {
            return NetworkService.getNetworkList().then(function(result) {
                $scope.networkList = result.data;
                $scope.networkList.selectedItem = result.data[0];
            });
        };           
        
        $scope.getCoinList = function () {
            return CoinService.getCoinList().then(function(result) {
                $scope.coinList = result.data;
                $scope.coinList.selectedItem = result.data[0];
            });
        };
        
        $scope.getInternationalCurrencyExchangeRate = function () {
            return CoinExchangeRateService.getInternationalCurrencyExchangeRate().then( function(result) {
                $scope.internationalExchangeRates = result.data || {};
            });
        };
        
        $scope.calcualteInternationalCurrencyExchangeRateRatio = function () {
            if( _.keys($scope.internationalExchangeRates).length ) {                            
                $scope.exchangeRatio = $scope.internationalExchangeRates["USD"] / $scope.internationalExchangeRates[$scope.networkList.selectedItem.currencyISOCode];

                _.forEach($scope.internationalExchangeRates,  function (value, key, item) {
                    item[key] = ($scope.exchangeRatio * value).toFixed(6);
                });
            };
        };
        
        $scope.getCoinExchangeRateFromLocalDB = function(){
            $scope.loadingCoinExchangeRate = true;
            $scope.loadingHandleSubmit = true;
            $scope.loading = true;
            $scope.getCoinExchangeRateByNetworkIdCoinId().then(function () {
                $scope.loading = false;
                $scope.loadingCoinExchangeRate = false;
                $scope.loadingHandleSubmit = false;
            });
        };
        
        $scope.handleSubmit = function () {
            if(  $scope.form.$valid ) {
                $scope.message = null;
                $scope.loadingCoinExchangeRate = true;
                $scope.loadingHandleSubmit = true;
                $scope.loading = true;

                var updateList = [], insertList = [];

                _.forEach($scope.coinExchangeRates, function (coinExchangeRate) {
                    coinExchangeRate.sellRate = coinExchangeRate.buyRate;
                    if (coinExchangeRate.exchangeRateId) {
                        coinExchangeRate.valueChanged && updateList.push(coinExchangeRate);
                    } else {
                        insertList.push(coinExchangeRate);
                    }
                });

                $scope.insertUpdateCoinExchageRate(updateList, insertList).then( function () {
                    $scope.getCoinExchangeRateByNetworkIdCoinId().then ( function () {
                        $scope.loadingCoinExchangeRate = false;
                        $scope.loadingHandleSubmit = false;
                        $scope.loading = false;
                    } ) ;
                });                
            }               
        };
        
        $scope.valueChanged = function (exchangeRate) {            
            if(! exchangeRate.buyRate ) {
                exchangeRate.invalid = true;
                $scope.form.$valid = false;
            } else {
                exchangeRate.valueChanged = true;
                exchangeRate.invalid = false;
                $scope.form.$valid = true;
            }
        }
        
        $scope.exchangeRateSuggestion = function() {
            if( _.keys($scope.internationalExchangeRates).length ) {
                _.forEach($scope.coinExchangeRates, function (coinExchangeRate) {
                    if ( $scope.internationalExchangeRates[coinExchangeRate.isoCode] ) {
                        coinExchangeRate.buyRate = ($scope.networkCurrency.buyRate * $scope.internationalExchangeRates[coinExchangeRate.isoCode]).toFixed(6);
                        coinExchangeRate.valueChanged = true;
                    }
                });
            }
        }
        
        init();      
    }    

})();