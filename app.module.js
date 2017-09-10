(function () {
'use strict';

// Define the `phonecatApp` module
angular.module('coinManagement', [
  'ui.router',
  'ngMessages', 
  'ngStorage', 
  'ngMockE2E',
  'angularUtils.directives.dirPagination',
  '720kb.datepicker'
]).controller('MainController', ['$scope', '$localStorage', 
    function($scope, $localStorage){
        $scope.isLoggedIn = function() {
            return $localStorage.currentUser;
        }
    }
]);
})();
