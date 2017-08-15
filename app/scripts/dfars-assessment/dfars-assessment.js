'use strict';
angular.module('dmc.dfars-assessment', [
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
    "dmc.data"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('dfars-assessment', {
        template: '<ui-view />'
      }).state('dfars-assessment.start', {
        url: '/',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html'
      }).state('dfars-assessment.1', {
        url: '/1',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html'
      }).state('dfars-assessment.finish', {
        url: '/finish',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html'
      });
    $urlRouterProvider.otherwise('/');
});
