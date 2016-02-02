'use strict';
/**
* dmc.dashboard Module
*
* Dashboard
*/

angular.module('dmc.marketplace', [
    'dmc.configs.ngmaterial',
    'ngMdIcons',
    'ui.router',
    'md.data.table',
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ngtimeago',
    'ngCookies',
    'dmc.widgets.documents',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.component.treemenu',
    'dmc.component.productscard',
    'dmc.component.carousel',
    'dmc.compare',
    'dmc.component.products-filter'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('marketplace', {
        url: '/home?page?type',
        templateUrl: 'templates/marketplace/marketplace.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return false;
            }
        }
    }).state('marketplace_search', {
        url: '/search?page?type?text',
        templateUrl: 'templates/marketplace/marketplace.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return true;
            }
        }
    });
    $urlRouterProvider.otherwise('/home?page=services&type=analytical');
})