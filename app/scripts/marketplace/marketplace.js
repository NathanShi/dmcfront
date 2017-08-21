'use strict';
angular.module('dmc.marketplace', [
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
    "dmc.data",
    "dmc.utilities",
    "dmc.widgets.content"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('marketplace', {
        template: '<ui-view />'
    }).state('marketplace.home', {
        url: '/',
        controller: 'marketplaceController',
        templateUrl: 'templates/marketplace/marketplace.html'
    });
    $urlRouterProvider.otherwise('/');
}).controller('marketplaceController', ['$scope', '$element', '$location', 'scrollService', '$http', 'dataFactory', function ($scope, $element, $location, scrollService, $http, dataFactory) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call scrollTo
        scrollService.scrollTo(eID);
    };

    $http.get(dataFactory.getMarketServices(), {
        params: {
            start: 0,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.marketplaceItems = response;
    });

    $http.get(dataFactory.getMarketServices(), {
        params: {
            start: 0,
            limit: 5,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.estimateItems = response;
    });

    $http.get(dataFactory.getMarketServices(), {
        params: {
            start: 5,
            limit: 5,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.cncOperationItems = response;
    });

    $http.get(dataFactory.getMarketServices(), {
        params: {
            start: 10,
            limit: 5,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.cmmOperationItems = response;
    });

    $http.get(dataFactory.getMarketServices(), {
        params: {
            start: 15,
            limit: 5,
            published: true
        }
    }).success(function(response) {
        console.log(response);
        $scope.getLeanItems = response;
    });

    $http.get(dataFactory.getDefaultServices(), {
    }).success(function(response) {
        $scope.serviceMap = {};
        response.forEach(function (service){
          $scope.serviceMap[service.parent] = {'serviceId': service.id, 'workspaceId': service.projectId};
        });
        console.log($scope.serviceMap);
    });

}]);
