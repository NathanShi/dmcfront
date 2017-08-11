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
        template: '<ui-view></ui-view>'
      }).state('jtViewer.home', {
        url: '/',
        controller: 'jtViewerController',
        templateUrl: 'templates/jtViewer/index.html'
    });
  })
