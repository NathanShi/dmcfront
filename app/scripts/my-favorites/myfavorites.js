'use strict';
angular.module('dmc.myfavorites', [
	'ngMdIcons',
	// 'ngAnimate',
	'ngMaterial',
	'ngCookies',
	// 'ngSanitize',
	// 'ui.sortable',
	'ui.router',
	// 'md.data.table',
	'dmc.configs.ngmaterial',
	'dmc.common.header',
	'dmc.common.footer',
	"dmc.ajax",
	// "dmc.data",
	// 'dmc.component.treemenu',
	// 'dmc.component.productscard',
	// 'dmc.component.productcard',
	// 'dmc.component.carousel',
	// 'dmc.compare',
	// 'dmc.model.toast-model',
	// 'dmc.component.products-filter',
  // 'dmc.model.previous-page',
	// 'dmc.model.services',
	// 'ng-autofocus'
])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider){
        $stateProvider
            .state('myFavorites', {
                url: '',
                abstract: true,
                controller: 'myfavoritesCtrl',
                template: '<ui-view></ui-view>',
                // templateUrl: 'templates/favorites/myfavorites.html'
            })
           .state('myFavorites.my', {
               url: '/my',
               templateUrl: 'templates/myfavorites/myfavorites.html',
               controller: 'myfavoritesCtrl2'
           });
        $urlRouterProvider.otherwise('/my');
    });
