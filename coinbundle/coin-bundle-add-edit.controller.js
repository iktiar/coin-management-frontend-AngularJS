(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('CoinBundleAddEditController', Controller);

    function Controller($scope, CoinBundleService, CoinService, NetworkService, CoinExchangeRateService, $stateParams, $state, $q) {

        $scope.handleSubmit = function () {
            if(!$scope.checkValidBundlePrice()){
                return;
            }
            
            $scope.message = null;
            if ($scope.coinBundleId)
                $scope.updateCoinBundle();
            else
                $scope.insertCoinBundle();
        }

        $scope.updateCoinBundle = function () {
            $scope.loading = true;
            $scope.coinBundle.coinBundleId = $scope.coinBundleId;

            $scope.coinBundle.coinId = $scope.coins.selectedCoin.coinId;
            $scope.coinBundle.coinName = $scope.coins.selectedCoin.coinName;

            $scope.coinBundle.bundleTypeId = $scope.bundleTypes.selectedBundle.bundleTypeId;
            $scope.coinBundle.bundleTypeName = $scope.bundleTypes.selectedBundle.bundleTypeName;
            $scope.coinBundle.buyRate = $scope.coinExchangeRates.selectedItem.buyRate;
            $scope.coinBundle.paymentMethodTypeId = $scope.paymentMethodItems.selectedPaymentMethod.paymentMethodTypeId;
            $scope.coinBundle.networkId = $scope.networkList.selectedItem.networkId;
            $scope.coinBundle.isoCode = $scope.coinExchangeRates.selectedItem.isoCode;

            CoinBundleService.updateCoinBundle($scope.coinBundle).then(function (result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };

        $scope.getNetworkList = function() {
            return NetworkService.getNetworkList().then(function(result) {
                $scope.networkList = result.data;
                $scope.networkList.selectedItem = result.data[0];
            });
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

        $scope.getCoinExchangeRateByNetworkIdCoinId = function () {
            
            return CoinExchangeRateService
                    .getCoinExchangeRateByNetworkIdCoinId($scope.networkList.selectedItem.networkId, $scope.coins.selectedCoin.coinId)
                    .then(function (result) {
                        $scope.networkCurrency = _.find(result.data, function(data){ return data.isoCode == $scope.networkList.selectedItem.currencyISOCode});
                        result.data = _.without(result.data, _.find(result.data, $scope.networkCurrency));
                        result.data.unshift($scope.networkCurrency);
                        
                        $scope.coinExchangeRates = result.data;
                        $scope.coinExchangeRates.selectedItem = result.data[0];
                    
                        _.forEach($scope.coinExchangeRates, function (coinExchangeRate) {
                            _.defaults(coinExchangeRate, 
                                {
                                    buyRate: 0, 
                                    networkId: $scope.networkList.selectedItem.networkId,
                                    coinId: $scope.coins.selectedCoin.coinId,
                                    active: true
                                }
                            );
                        });
                    });
        };
        
        
        $scope.insertCoinBundle = function () {
            $scope.loading = true;
            $scope.coinBundle.coinId = $scope.coins.selectedCoin.coinId;
            $scope.coinBundle.coinName = $scope.coins.selectedCoin.coinName;

            $scope.coinBundle.bundleTypeId = $scope.bundleTypes.selectedBundle.bundleTypeId;
            $scope.coinBundle.bundleTypeName = $scope.bundleTypes.selectedBundle.bundleTypeName;
            $scope.coinBundle.buyRate = $scope.coinExchangeRates.selectedItem.buyRate;
            $scope.coinBundle.paymentMethodTypeId = $scope.paymentMethodItems.selectedPaymentMethod.paymentMethodTypeId;
            $scope.coinBundle.networkId = $scope.networkList.selectedItem.networkId; 
         
            $scope.coinBundle.isoCode = $scope.coinExchangeRates.selectedItem.isoCode;

            CoinBundleService.insertCoinBundle($scope.coinBundle).then(function (result) {
                if (result.sucs) {
                    $scope.error = false;
                    $stateParams.coinBundleId = result.coinBundleId;
                    $state.transitionTo('master-page.coin-bundle-add-edit', $stateParams);
                    init();
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };

        $scope.getRuleItemList = function () {
            return CoinBundleService.getRuleItemList().then(function (result) {
                $scope.ruleItems = result.ruleItems;
                $scope.ruleItems.selectedItem = result.ruleItems[0];
            });
        }

        $scope.getPaymentMethods = function () {
            return CoinBundleService.getPaymentMethods().then(function (result) {
                
                $scope.paymentMethodItems = result.paymentMethodType;
                $scope.paymentMethodItems.selectedPaymentMethod = result.paymentMethodType[0];
            });
        }
        
        $scope.getCoinList = function () {
            return CoinService.getCoinList().then(function (result) {
                $scope.coins = result.data;
                $scope.coins.selectedCoin = result.data[0];
            });
        }

        $scope.getBundleTypes = function () {
            return CoinBundleService.getBundleTypes().then(function (result) {

                $scope.bundleTypes = result.bundleTypes;
                $scope.bundleTypes.selectedBundle = result.bundleTypes[0];
            });
        }
        
        $scope.checkValidBundlePrice = function () {
            
            if( ($scope.coinBundle.coinQuantity && !$scope.coinBundle.bundlePrice) 
                    || ($scope.coinBundle.bundlePrice  < ($scope.coinExchangeRates.selectedItem.buyRate*$scope.coinBundle.coinQuantity)) )
            {
               
                $scope.coinBundleForm.bundlePrice.$invalid = true;
                return ;
            }
           
            $scope.coinBundleForm.bundlePrice.$invalid = false;
            return true;
        }

        function init() {
            $scope.coinBundle = {};
            $scope.getBundleTypes()
            $scope.coinBundle.active = true;
            $scope.coinBundle.isApplicableForFirstTime = true;
            $scope.coinBundle.freeCoinQuantity = 0;
            $scope.loadingCoinExchangeRate = true;
            $scope.loading = true;
            $scope.loadingHandleSubmit = true;

            $scope.message = '';
            $scope.coinBundleId = $stateParams.coinBundleId;

            if ($scope.coinBundleId === "new") {
                $scope.coinBundleId = 0;
                $scope.operation = "Create";
            } else {
                $scope.operation = "Update";
            }

            $q.all([
                $scope.getCoinList(),
                $scope.getBundleTypes(),
                $scope.getPaymentMethods(),
                $scope.getNetworkList()
            ]).then(function () {
                $scope.getCoinExchangeRateByNetworkIdCoinId().then(function () {
                    $scope.loadingCoinExchangeRate = false;
                    $scope.loading = false;
                    $scope.loadingHandleSubmit = false;
                    
                    if($scope.operation === "Update")
                    {
                        CoinBundleService.getCoinBundleDetails($scope.coinBundleId).then(function (response) {
                            $scope.coinBundle = response.coinBundle;
                            $scope.coins.selectedCoin = _.find($scope.coins, {coinId: $scope.coinBundle.coinId});
                            $scope.bundleTypes.selectedBundle = _.find($scope.bundleTypes, {bundleTypeId: $scope.coinBundle.bundleTypeId});
                            $scope.paymentMethodItems.selectedPaymentMethod =  _.find($scope.paymentMethodItems, {paymentMethodTypeId: $scope.coinBundle.paymentMethodTypeId});
                            $scope.coinExchangeRates.selectedItem = _.find($scope.coinExchangeRates, {isoCode: $scope.coinBundle.currencyISOCode});
                        });
                    }
                } );
               
            });
        }

        init();

    }

})();