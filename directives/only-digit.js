(function () {
    'use strict';

angular
  .module('coinManagement')
  .directive('onlyDigits', function () {

    return {
        restrict: 'A',
        scope: {
            minValue: '=',
            desimalAllowed: '=',
            maxValue: '='
        },
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput;
                
                if(scope.desimalAllowed) {
                    transformedInput = inputValue.replace(/[^0-9.]/g, '');
                    
                    if (transformedInput.split('.').length > 2) {
                        transformedInput = transformedInput.substring(0, transformedInput.length - 1);
                    }
                } else {
                   transformedInput = inputValue.replace(/[^0-9]/g, '');
                }
                
                if(transformedInput < scope.minValue) 
                    transformedInput = '';
                
                if(transformedInput > scope.maxValue) 
                    transformedInput = '';
                
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});
})();