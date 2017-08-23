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
    'angularUtils.directives.dirPagination',
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

    function getContentStatic(callbackFunction) {
        ajax.get(dataFactory.getStaticJSON('static-marketplace.json'), {}, function(response){
            $scope.marketplaceItems=response.data;
            $scope.marketplaceItemsCopy =response.data;
            callbackFunction();
        });
    }


    var groupServicesByType = function(data) {
      var serviceTypes = {};
      var servicesGroupedByType = [];
      for (var i in data) {
        if (serviceTypes[data[i].categoryQuestion]) {
            for (var j in servicesGroupedByType) {
              if (servicesGroupedByType[j]["categoryQuestion"] == data[i].categoryQuestion) {
                servicesGroupedByType[j]["content"].push(data[i])
              }
            }
        } else {
          servicesGroupedByType.push({
            "categoryQuestion": data[i].categoryQuestion,
            "categoryImage":data[i].categoryImg,
            "categoryId":data[i].categoryId,
            "content": [data[i]]
          });
          serviceTypes[data[i].categoryQuestion] = true
        }
      };

     servicesGroupedByType.sort(function(a, b){
        if(a.categoryQuestion < b.categoryQuestion) return -1;
        if(a.categoryQuestion > b.categoryQuestion) return 1;
        return 0;
      });
      return servicesGroupedByType;
    };

    $scope.contentArray = groupServicesByType($scope.marketplaceItems)


    getContentStatic(function(){
      $scope.getLeanItems=[]
      $scope.estimateItems=[]
      $scope.cncOperationItems=[]
      $scope.cmmOperationItems=[]

      for (var i = 0; i < $scope.marketplaceItems.length; i++) {
        // $scope.allMktItems.push($scope.marketplaceItems[i]);
        if ($scope.marketplaceItems[i].categoryContent=='GET LEAN'){
          $scope.getLeanItems.push($scope.marketplaceItems[i])
        }
        else if ($scope.marketplaceItems[i].categoryContent=='IMPROVE ESTIMATES'){
          $scope.estimateItems.push($scope.marketplaceItems[i])
        }

        else if ($scope.marketplaceItems[i].categoryContent=='IMPROVE CNC OPERATIONS'){
          $scope.cncOperationItems.push($scope.marketplaceItems[i])
        }

        else{
          $scope.cmmOperationItems.push($scope.marketplaceItems[i])
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



    $http.get(dataFactory.getDefaultServices(), {
    }).success(function(response) {
        $scope.serviceMap = {};
        response.forEach(function (service){
          $scope.serviceMap[service.parent] = {'serviceId': service.id, 'workspaceId': service.projectId};
        });
    });

    $http.get(dataFactory.getDefaultServices(), {
    }).success(function(response) {
        $scope.serviceMap = {};
        response.forEach(function (service){
          $scope.serviceMap[service.parent] = {'serviceId': service.id, 'workspaceId': service.projectId};
        });
    });

}]);
