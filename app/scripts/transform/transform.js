'use strict';
angular.module('dmc.transform', [
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
    "dmc.utilities"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('transform', {
        template: '<ui-view />'
    }).state('transform.home', {
        url: '/',
        controller: 'TransformController',
        templateUrl: 'templates/transform/transform.html'
    });
    $urlRouterProvider.otherwise('/');
}).controller('TransformController', function ($scope, $element, $location, scrollService) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);
    
        // call scrollTo
        scrollService.scrollTo(eID);
    };
   
});