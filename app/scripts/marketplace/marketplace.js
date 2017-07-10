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
    'dmc.component.featuredAppcard',
    'dmc.marketplace-content',
    'dmc.compare',
    'dmc.widgets.tasks',
    'dmc.widgets.tabs',
    'dmc.component.products-filter'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('marketplace', {
        url: '/home?product?type?text',
        templateUrl: 'templates/marketplace/apps.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return false;
            }
        }
    }).state('marketplace_search', {
        url: '/search?product?type?authors?ratings?favorites?dates?text?tag',
        templateUrl: 'templates/marketplace/marketplace.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return true;
            }
        }
    }).state('apps', {
        // url: '/search?product?type?authors?ratings?favorites?dates?text?tag',
        templateUrl: 'templates/marketplace/apps.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return false;
            }
        }
    }).state('content', {
        // url: '/search?product?type?authors?ratings?favorites?dates?text?tag',
        templateUrl: 'templates/marketplace/content.html',
        controller: 'DMCMarketplaceController',
        resolve: {
            is_search: function() {
                return false;
            }
        }
    }).state('content-details', {
        url: '/:contentTitle',
        templateUrl: 'templates/marketplace-content/marketplace-content.html',
        controller: 'MarketplaceContentController',
        resolve: {
          contentData: ['$stateParams', function ( $stateParams) {
              console.log('stateparams',$stateParams)
              return $stateParams;
              // return serviceModel.get_service($stateParams.serviceId);
          }]
        }
    });
    $urlRouterProvider.otherwise('/home?product=services');
});
