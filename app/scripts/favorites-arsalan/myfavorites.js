'use strict';
angular.module('dmc.myfavorites-arsalan', [
  'ngMdIcons',
	'ngAnimate',
	'ngMaterial',
	'ngCookies',
	'ngSanitize',
	'ui.sortable',
	'ui.router',
	'md.data.table',
	'dmc.configs.ngmaterial',
	'dmc.common.header',
	'dmc.common.footer',
	"dmc.ajax",
	"dmc.data",
	'dmc.component.treemenu',
	'dmc.component.productscard',
	'dmc.component.productcard',
	'dmc.component.carousel',
	'dmc.compare',
	'dmc.model.toast-model',
	'dmc.component.products-filter',
  'dmc.model.previous-page',
	'dmc.model.services',
	'ng-autofocus'
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('myfavorites', {
        template: '<ui-view />'
      }).state('myfavorites.home', {
        url: '/',
        controller: 'myfavorites-controller',
        templateUrl: 'templates/favorites-arsalan/myfavorites.html'
    });
    $urlRouterProvider.otherwise('/');
});
