(function () {
    'use strict';

    angular
            .module('coinManagement')
            .factory('ProductService', Service);

    function Service($http, $q) {
        var service = {};

        service.getProductList = getProductList;
        service.getProductTypeList = getProductTypeList;
        service.getProductCategories = getProductCategories;
        service.insertProduct = insertProduct;
        service.deleteProduct = deleteProduct;
        service.getProduct = getProduct;
        service.updateProduct = updateProduct;

        return service;

        function getProductList() {
            var deferred = $q.defer();

            $http.get('api/product/getallproductcs')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.products;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getProductTypeList() {
            var deferred = $q.defer();

            $http.get('api/product/getproducttypes')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.productTypes;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function getProductCategories() {
            var deferred = $q.defer();

            $http.get('api/product/getproductcategories')
                    .success(function (response) {
                        response.message = response.mg;
                        response.data = response.productCategories;
                        deferred.resolve(response);
                    });

            return deferred.promise;
        }

        function insertProduct(productName, productPrice, productTypeId, productPriceCoinId, isApplicableForAllStores, productPriceCoinQuantity, productCategoryId, productIcon, active) {
            var deferred = $q.defer();
            $http.post('api/product/insertproduct', {"productName": productName, "productPrice": productPrice, "productTypeId": productTypeId, "productPriceCoinId": productPriceCoinId, "isApplicableForAllStores": isApplicableForAllStores, "productPriceCoinQuantity": productPriceCoinQuantity, "productCategoryId": productCategoryId, "productIcon": productIcon, "active": active})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function deleteProduct(productId) {
            var deferred = $q.defer();
            $http.post('api/product/deleteproduct', {"productId": productId})
                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }

        function getProduct(productId) {
            var deferred = $q.defer();
            $http.get('api/product/getproduct?productId=' + productId, {})
                    .success(function (response) {
                        response.message = response.mg;
                        if (response.sucs == true) {
                            deferred.resolve(response.product);
                        } else {
                            deferred.resolve({});
                        }
                    });
            return deferred.promise;
        }

        function updateProduct(productId, productName, productPrice, productTypeId, productPriceCoinId, isApplicableForAllStores, productPriceCoinQuantity, productCategoryId, productIcon, active) {
            var deferred = $q.defer();
            $http.post('api/product/updateproduct', {"productId": productId, "productName": productName, "productPrice": productPrice, "productTypeId": productTypeId, "productPriceCoinId": productPriceCoinId, "isApplicableForAllStores": isApplicableForAllStores, "productPriceCoinQuantity": productPriceCoinQuantity, "productCategoryId": productCategoryId, "productIcon": productIcon, "active": active})

                    .success(function (response) {
                        response.message = response.mg;
                        deferred.resolve(response);
                    });
            return deferred.promise;
        }
    }
})();