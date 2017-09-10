(function () {
'use strict';

angular
    .module('coinManagement')
    .controller('ProductListController', Controller);
  
  function Controller(ProductService, $scope) {
     
     //pagination config setup
     $scope.currentPage = 1;
     $scope.pageSize = 6;             
     
     $scope.data = [];    
     $scope.productTypeList = [];
     $scope.productcategorylist = [];
          
      $scope.getProductList = function() {
        ProductService.getProductList().then(function(result) {
            $scope.data = result.data;
            
        });
      }
      
      $scope.deleteProduct = function (id) {
        $scope.message = null;
        
        if (confirm(lang('message.confirm.delete', 'product'))) {
            ProductService.deleteProduct(id).then(function(result) {
                $scope.getProductList();
                if (result.sucs) {
                    $scope.error = false;
                } else {
                    $scope.error = true;
                }
                $scope.message = result.message;
            });
        }
      }
      
      $scope.getProductList();
      
    }    
})();