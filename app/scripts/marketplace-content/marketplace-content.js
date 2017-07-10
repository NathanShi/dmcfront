'use strict';
angular.module('dmc.marketplace-content', [
    'ngMdIcons',
    'ngMaterial',
    'ngSanitize',
    'ui.router',
    'dmc.configs.ngmaterial',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.ajax',
    'dmc.data'
]).config(function($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider){
    $stateProvider.state('marketplace-content', {
      url: '/',
      templateUrl: 'templates/marketplace-content/marketplace-content.html',
      controller: 'MarketplaceContentController'
      // resolve: resolve
    });
    $urlRouterProvider.otherwise('/');
});
