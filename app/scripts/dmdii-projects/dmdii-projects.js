'use strict';
/**
* dmc.dashboard Module
*
* Dashboard
*/

angular.module('dmc.dmdiiProjects', [
    'dmc.configs.ngmaterial',
    'ngMdIcons',
    'ngSanitize',
    'ng-showdown',
    'ui.router',
    'md.data.table',
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ngtimeago',
    'ngCookies',
    'angularUtils.directives.dirPagination',
    'angular-horizontal-timeline',
    'dmc.widgets.documents',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.component.treemenu',
    'dmc.component.horizontalmenu',
    'dmc.widgets.tasks',
    'ui.bootstrap',
    'bootstrapLightbox',
    'dmc.widgets.tabs'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider,LightboxProvider){
    $stateProvider.state('dmdii_projects', {
        url: '/dmdii_projects?status?rootNumber?callNumber?statusId?focusId?thrustId',
        templateUrl: 'templates/dmdii-projects/dmdii-projects.html',
        controller: 'DMCDmdiiProjectsController',
        resolve: {
            is_search: function() {
                return false;
            }
        }
    }).state('dmdii_projects_search', {
		url: '/dmdii_projects/search?status?rootNumber?callNumber?statusId?focusId?thrustId',
        templateUrl: 'templates/dmdii-projects/dmdii-projects.html',
        controller: 'DMCDmdiiProjectsController',
        resolve: {
            is_search: function() {
                return true;
            }
        }
    });
    $urlRouterProvider.otherwise('/dmdii_projects');

    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
      return {
        'maxWidth': dimensions.windowWidth >= 768 ? // default
          dimensions.windowWidth - 92 :
          dimensions.windowWidth - 52,
        'maxHeight': dimensions.imageHeight                           // custom
      };
    };

});
