(function () {
    'use strict';

    angular
            .module('coinManagement')
            .controller('CoinBundleListController', Controller);

    function Controller($scope, CoinBundleService, DefaultService, AppConstants) {
        
        $scope.currentPage = 1;
        $scope.pageSize = 6;

        $scope.getCoinBundle = function () {
            CoinBundleService.getCoinBundleList().then(function (response) {
                $scope.coinBundle = response.coinBundle;
            });
        };

        $scope.deleteCoinBundle = function (coinBundleId) {
            $scope.message = null;
            if (confirm(lang('message.confirm.delete', 'coin bundle'))) {
                CoinBundleService.deleteCoinBundle(coinBundleId).then(function (response) {
                    $scope.getCoinBundle();
                    if (response.sucs) {
                        $scope.error = false;
                    } else {
                        $scope.error = true;
                    }
                    $scope.message = response.message;
                    $scope.loading = false;
                });
            }
        };
        
        function init() {
            $scope.getCoinBundle();
        }

        init();

    }
})();