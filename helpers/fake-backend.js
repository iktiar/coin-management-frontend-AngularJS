(function () {
    'use strict';

    angular
        .module('coinManagement')
        .run(setupFakeBackend);

    // setup fake backend for backend-less development
    function setupFakeBackend($httpBackend) {
        $httpBackend.when('JSONP', /^\w+.*/).passThrough();
        $httpBackend.whenGET('http://www.apilayer.net/api/live?access_key=7a8b7eb707eddabdf0d4b33257fd06d5&format=1&callback=jsonp_callback').passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();

        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();

