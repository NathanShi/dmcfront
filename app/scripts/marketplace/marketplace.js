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
}).controller('marketplaceController', ['$scope', '$element', '$location', 'scrollService', '$http','ajax', 'dataFactory', function ($scope, $element, $location, scrollService, $http, ajax,dataFactory) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call scrollTo
        scrollService.scrollTo(eID);
    };

    $scope.clearSearch = function(){
      $scope.searchTerm='';
    }

    var callbackServices = function(response){
        for(var index in response.data){
            response.data[index].type = 'service';
        }
        $scope.marketplaceItems = response.data;
    };

    var content = {
        published : true,
        _limit : 50,
        _sort : 'id',
        _order : 'DESC'
    };

    $scope.search = function(text){
      ajax.get(dataFactory.searchMarketplaceItems(text), content, callbackServices);
    }


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

}]);
