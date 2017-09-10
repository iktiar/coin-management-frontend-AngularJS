(function () {
    'use strict';

    angular
        .module('coinManagement')
        .controller('ProductAddEditController', Controller);

    function Controller($scope, $stateParams, $state, ProductService, CoinService,  $q) {
        function init () {
            $scope.active = true;
            $scope.isApplicableForAllStores = true;
            $scope.message = '';
            $scope.productId = $stateParams.productId;
            $scope.loading = true; 

            if($scope.productId == "new") {
                $scope.productId = 0;
                $scope.operation = "Create";
            } else {
              $scope.operation = "Update";
            } 
                $q.all([
                    $scope.getProductTypeList(),
                    $scope.getProductCategoryList(),
                    $scope.getCoinList()
                ]).then(function () {
                   $scope.loading = false;
                 if($scope.operation == "Update") {   
                    ProductService.getProduct($scope.productId).then(function(result) { 
                        $scope.productName = result.productName;
                        $scope.productTypeId = result.productTypeId;
                        $scope.productPriceCoinId = result.productPriceCoinId;
                        $scope.isApplicableForAllStores = result.isApplicableForAllStores;
                        $scope.productPriceCoinQuantity = result.productPriceCoinQuantity;
                        $scope.productPrice = result.productPrice;
                        $scope.productCategoryId = result.productCategoryId;
                        $scope.productIcon = result.productIcon;
                        $scope.active = result.active;  

                        $scope.productTypes.selectedItem = _.find($scope.productTypes, {productTypeId: $scope.productTypeId});
                        $scope.productCategories.selectedItem = _.find($scope.productCategories, {productCategoryId: $scope.productCategoryId});
                        if($scope.productPriceCoinId){
                            $scope.coinTypes.selectedItem = _.find($scope.coinTypes, {coinId: $scope.productPriceCoinId});
                        }
                        
                    }); //end product then
                }//end of If 
                
              }); //end of allthen
            }
        
        $scope.handleSubmit = function() {
            
            if($scope.isValidProductPrice()) {
                $scope.noPriceSelectionerror = false;
            }
            else {
                $scope.noPriceSelectionerror = true;
                
                return;
            }
            
            $scope.message = null;
            if($scope.productId)
                $scope.updateProduct();
            else
                $scope.insertProduct();
        }
        
        $scope.isValidProductPrice = function () {
            
            if(!$scope.productPrice && !$scope.coinTypes.selectedItem.coinId  && !$scope.productPriceCoinQuantity )
            {
                return false;
            }
            if( ($scope.coinTypes.selectedItem.coinId  && !$scope.productPriceCoinQuantity)
               || (!$scope.coinTypes.selectedItem.coinId  && $scope.productPriceCoinQuantity)  ) 
            {
                return false;
            }
           
            return true; 
        }
        
        
        $scope.updateProduct = function () {
            $scope.loading = true;            
            ProductService.updateProduct($scope.productId, $scope.productName, $scope.productPrice, $scope.productTypes.selectedItem.productTypeId, $scope.coinTypes.selectedItem.coinId, $scope.isApplicableForAllStores, 
            $scope.productPriceCoinQuantity,  $scope.productCategories.selectedItem.productCategoryId,  $scope.productIcon, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        $scope.insertProduct = function() {
            $scope.loading = true;            
            ProductService.insertProduct($scope.productName, $scope.productPrice, $scope.productTypes.selectedItem.productTypeId, $scope.coinTypes.selectedItem.coinId, $scope.isApplicableForAllStores, 
            $scope.productPriceCoinQuantity,  $scope.productCategories.selectedItem.productCategoryId,  $scope.productIcon, $scope.active).then(function(result) {
                if (result.sucs) {
                    $scope.error = false;
                    $stateParams.productId = result.productId;
                    $state.transitionTo('master-page.product-add-edit', $stateParams);
                    init();
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
                $scope.loading = false;
            });
        };
        
        $scope.getCoinList = function() {
             return CoinService.getCoinList().then ( function(result) {
              //add a select option
              result.data.unshift({"coinName":"Select coin" });
              $scope.coinTypes = result.data;
              $scope.coinTypes.selectedItem = result.data[0];
          });
       };
        
        $scope.getProductTypeList = function() {
             return ProductService.getProductTypeList().then ( function(result) {
              $scope.productTypes = result.data;
              $scope.productTypes.selectedItem = result.data[0];
          });
       };
      
        $scope.getProductCategoryList = function() {
              return ProductService.getProductCategories().then ( function(result) {
              $scope.productCategories = result.data;
              $scope.productCategories.selectedItem = result.data[0]; 
              
          });
      };
        
    init();
    }

})();