(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('CoinAddEditController', Controller);

    function Controller($scope, $stateParams, $state, CoinService) {
        function init () {
            $scope.active = true;
            $scope.message = '';
            $scope.coinId = $stateParams.coinId;

            if($scope.coinId == "new") {
                $scope.coinId = 0;
                $scope.operation = "Create";
            } else {
              $scope.operation = "Update";

              CoinService.getCoin($scope.coinId).then(function(result) {
                 $scope.coinName = result.coinName;
                 $scope.baseUnit = result.baseUnit;
                 $scope.active = result.active;
              });
            }
        }
        
        $scope.handleSubmit = function() {
            $scope.message = null;
            if($scope.coinId)
                $scope.updateCoin();
            else
                $scope.insertCoin();
        }
        
        $scope.updateCoin = function () {
            $scope.loading = true;            
            CoinService.updateCoin($scope.coinId, $scope.coinName, $scope.baseUnit, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        $scope.insertCoin = function() {
            $scope.loading = true;            
            CoinService.insertCoin($scope.coinName, $scope.baseUnit, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                    $stateParams.coinId = result.coinId;
                    $state.transitionTo('master-page.coin-add-edit', $stateParams);
                    init();
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        init();
    }

})();