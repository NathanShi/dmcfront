'use strict';
angular.module('dmc.marketplace', [
    'ngMdIcons',
    'ngAnimate',
    'ngMaterial',
    'ngSanitize',
    'ui.router',
    'md.data.table',
    'dmc.configs.ngmaterial',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.model.toast-model',
    "dmc.ajax",
    "dmc.data",
    "dmc.utilities",
    "dmc.widgets.content"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('marketplace', {
        template: '<ui-view />'
    }).state('marketplace.home', {
        url: '/',
        controller: 'marketplaceController',
        templateUrl: 'templates/marketplace/marketplace.html'
    });
    $urlRouterProvider.otherwise('/');
}).controller('marketplaceController', ['$scope', '$element', '$location', 'scrollService', '$http', 'dataFactory', function ($scope, $element, $location, scrollService, $http, dataFactory) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call scrollTo
        scrollService.scrollTo(eID);
    };
    console.log(dataFactory.getServices());
    $http.get(dataFactory.getMarketServices(), {
        params: {
            _start: 0,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.marketplaceItems = response;
    });

}]);