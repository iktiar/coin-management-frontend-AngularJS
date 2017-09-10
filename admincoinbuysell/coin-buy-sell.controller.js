(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('CoinBuySellController', Controller);

    function Controller($scope, $stateParams, $q, NetworkService, CoinService, CoinExchangeRateService, AdminCoinBuySellService, AppConstants) {
        if($stateParams.operation == "sell") {
            $scope.operation = "Sell";
        } else {
            $scope.operation = "Buy";
        }
        
        $scope.totalSuggestiveAmount = 0;
        $scope.message = '';
        
        $scope.calculateTotalAmount = function () {
            var coinAmount = $scope.coinAmount | 0;
            $scope.totalSuggestiveAmount = ($scope.exchangeRate * coinAmount).toFixed(4);
        };
        
        $scope.getNetworkList = function() {
            return NetworkService.getNetworkList().then(function(result) {
                $scope.network = result.data[0];
            });
        };           
        
        $scope.getCoinList = function () {
            return CoinService.getCoinList().then(function(result) {
                $scope.coin = result.data[0];
            });
        };
        
        $q.all([
            $scope.getNetworkList(),
            $scope.getCoinList()
        ]).then(function () {
             $scope.getCoinExchangeRateByNetworkIdCoinId(); 
        });
        
        
        $scope.checkValidCoinPrice = function () {
            if( ($scope.coinAmount && $scope.totalAmount) 
                    && ($scope.totalAmount  < ($scope.exchangeRate*$scope.coinAmount)) )
            {
               
                $scope.coinBuySellForm.totalAmount.$invalid = true;
                return ;
            }
           
            $scope.coinBuySellForm.totalAmount.$invalid = false;
            return true;
        }
        
        
        $scope.updateExchangeRate = function() {
                 $scope.exchangeRate =  ($scope.operation === "Sell") ? $scope.coinExchangeRate.selectedItem.sellRate :  $scope.coinExchangeRate.selectedItem.buyRate;
        };
       
        $scope.getCoinExchangeRateByNetworkIdCoinId = function () {
            
            return CoinExchangeRateService
                    .getCoinExchangeRateByNetworkIdCoinId($scope.network.networkId, $scope.coin.coinId)
                    .then(function (result) {
                        $scope.networkCurrency = _.find(result.data, function(data){ return data.isoCode == $scope.network.currencyISOCode});
                        result.data = _.without(result.data, _.find(result.data, $scope.networkCurrency));
                        result.data.unshift($scope.networkCurrency);
                        
                        $scope.coinExchangeRate = result.data;
                        $scope.coinExchangeRate.selectedItem = result.data[0];
                        $scope.exchangeRate =  ($scope.operation === "Sell") ? $scope.coinExchangeRate.selectedItem.sellRate :  $scope.coinExchangeRate.selectedItem.buyRate;
         
                        _.forEach($scope.coinExchangeRate, function (coinExchangeRate) {
                            _.defaults(coinExchangeRate, 
                                {
                                    buyRate: 0, 
                                    networkId: $scope.network.networkId,
                                    coinId: $scope.coin.coinId,
                                    active: true
                                }
                            );
                        });
                    });
        };
        
        $scope.handleSubmit = function() {
            
            if(!$scope.checkValidCoinPrice()){
                return;
            }
            
            $scope.loading = true;
            $scope.message = null;
            $scope.exchangeRate =  ($scope.operation === "Sell") ? $scope.coinExchangeRate.selectedItem.sellRate :  $scope.coinExchangeRate.selectedItem.buyRate;
         
            var data = {};
            data["data"] = {};
            
            data["data"]["currencyISOCode"] = $scope.coinExchangeRate.selectedItem.isoCode;
            data["data"]["cashAmount"] = $scope.totalAmount;
            data["data"]["exchangeRate"] = $scope.exchangeRate;
            data["data"]["coinAmount"] = $scope.coinAmount;
            data["data"]["coinId"] = $scope.coin.coinId;
            
            data["data"]["networkId"] = $scope.network.networkId;
            data["data"]["reference"] = "cyclos";
            data["data"]["remarks"] = $scope.remarks || '';
            
            if($scope.operation == "Sell") {
                $scope.sellCoin(data);
            } else {
                $scope.buyCoin(data);
            }
            
            $scope.coinBuySellForm.$setPristine();
        };
        
        $scope.buyCoin = function (data) {
            data["data"]["fromUserId"] = $scope.userId;
            data["data"]["toUserId"] = -1;
            data["data"]["fromUserTypeId"] = AppConstants.UserTypeId.General;
            data["data"]["toUserTypeId"] = AppConstants.UserTypeId.IPVision;
            
            AdminCoinBuySellService.buyCoin(data).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
                
                $scope.totalAmount = 0;
                $scope.coinAmount = null;
                $scope.userId = null;
                $scope.remarks = null;
            });
        };
        
        $scope.sellCoin = function (data) {
            data["data"]["fromUserId"] = -1;
            data["data"]["toUserId"] = $scope.userId;
            data["data"]["fromUserTypeId"] = AppConstants.UserTypeId.IPVision;
            data["data"]["toUserTypeId"] = AppConstants.UserTypeId.General;
            
            AdminCoinBuySellService.sellCoin(data).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
                
                $scope.totalAmount = 0;
                $scope.coinAmount = null;
                $scope.userId = null;
                $scope.remarks = null;
            });
        };
        
    }    
})();