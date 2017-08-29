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

    var resolve = {
      dfarsModules: ['ajax', 'dataFactory', function (ajax, dataFactory) {
          return ajax.get(dataFactory.dfarsAssessment().getModules, {}, function(response){return response.data;});
      }],
      savedData: ['ajax', 'dataFactory', function (ajax, dataFactory) {
          return ajax.get(dataFactory.dfarsAssessment().getSavedData, {}, function(response){return response.data;});
      }]
    };

    $stateProvider.state('dfars-assessment', {
        template: '<ui-view />'
      }).state('dfars-assessment.start', {
        url: '/',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html',
        resolve: resolve
      }).state('dfars-assessment.access_control', {
        url: '/access_control',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html',
        resolve: resolve
      }).state('dfars-assessment.finish', {
        url: '/finish',
        controller: 'DfarsController',
        templateUrl: 'templates/dfars-assessment/dfars-assessment.html',
        resolve: resolve
      });
    $urlRouterProvider.otherwise('/');
});
