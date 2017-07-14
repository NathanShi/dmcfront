'use strict';
angular.module('dmc.jtViewer', [
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
    $stateProvider.state('jtViewer', {
        template: '<ui-view />'
      }).state('jtViewer.view', {
        url: '/',
        controller: 'AboutController',
        templateUrl: 'templates/about/about.html'
    });
    $urlRouterProvider.otherwise('/');
});
