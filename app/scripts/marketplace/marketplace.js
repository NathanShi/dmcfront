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
}).controller('marketplaceController', ['$scope', '$element', '$location', 'scrollService', '$http','ajax','dataFactory', function ($scope, $element, $location, scrollService, $http, ajax,dataFactory) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call scrollTo
        scrollService.scrollTo(eID);
    };

    $scope.getLeanItems=[]


    // $scope.getContentStatic = function() {
    //     $scope.marketplaceItems=[]
    //     ajax.get(dataFactory.getStaticJSON('static-marketplace.json'), {}, function(response){
    //         $scope.marketplaceItems=response.data;
    //         $scope.categorizeContent($scope.marketplaceItems);
    //     });
    // }

    function getContentStatic(callbackFunction) {
        $scope.marketplaceItems=[]
        ajax.get(dataFactory.getStaticJSON('static-marketplace.json'), {}, function(response){
            $scope.marketplaceItems=response.data;
            $scope.marketplaceItemsCopy =response.data;
            callbackFunction();
            // $scope.categorizeContent($scope.marketplaceItems);
        });
    }


    // $scope.categorizeContent = function(content){
    //   for (var i = 0; i < content.length; i++) {
    //
    //     if (content[i].content_category=='GET LEAN'){
    //       $scope.getLeanItems = content[i]
    //     }
    //
    //     // else if (content[i].content_category=='IMPROVE ESTIMATES'){
    //     //   $scope.estimateItems = content[i]
    //     // }
    //     //
    //     // else if (content[i].content_category=='IMPROVE CNC OPERATIONS'){
    //     //   $scope.cncOperationItems = content[i]
    //     // }
    //     //
    //     // else{
    //     //   $scope.cmmOperationItems = content[i]
    //     // }
    //
    //   }
    // }

    getContentStatic(function(){
      for (var i = 0; i < $scope.marketplaceItems.length; i++) {
        if ($scope.marketplaceItems[i].content_category=='GET LEAN'){
          $scope.getLeanItems = $scope.marketplaceItems[i]
        }
      }
    });


    $scope.search=function(text){
      if (text){
        text=text.toLowerCase();
        var item =$scope.marketplaceItemsCopy.filter(function (obj){
          if ((obj.title.toLowerCase().includes(text)) || obj.tags.includes(text) ){
            return obj;
          }
        });
        $scope.marketplaceItems=item;
      }
      else{
        $scope.marketplaceItems=$scope.marketplaceItemsCopy;
      }
    }

    $scope.clearSearch = function(){
      $scope.searchTerm='';
    }






    // $http.get(dataFactory.getMarketServices(), {
    //     params: {
    //         start: 0,
    //         published: true
    //     }
    // }).success(function(response) {
    //     // console.log(response);
    //     $scope.marketplaceItems = response;
    // });

    // $http.get(dataFactory.getMarketServices(), {
    //     params: {
    //         start: 0,
    //         limit: 5,
    //         published: true
    //     }
    // }).success(function(response) {
    //     // console.log(response);
    //     $scope.estimateItems = response;
    // });

    // $http.get(dataFactory.getMarketServices(), {
    //     params: {
    //         start: 5,
    //         limit: 5,
    //         published: true
    //     }
    // }).success(function(response) {
    //     // console.log(response);
    //     $scope.cncOperationItems = response;
    // });
    //
    // $http.get(dataFactory.getMarketServices(), {
    //     params: {
    //         start: 10,
    //         limit: 5,
    //         published: true
    //     }
    // }).success(function(response) {
    //     // console.log(response);
    //     $scope.cmmOperationItems = response;
    // });

    // $http.get(dataFactory.getMarketServices(), {
    //     params: {
    //         start: 15,
    //         limit: 5,
    //         published: true
    //     }
    // }).success(function(response) {
    //     // console.log(response);
    //     $scope.getLeanItems = response;
    // });

}]);
