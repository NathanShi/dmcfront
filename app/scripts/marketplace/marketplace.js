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
        templateUrl: 'templates/marketplace/marketplaceII.html'
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
            // $scope.marketplaceItems=response.data;
            // $scope.marketplaceItemsCopy =response.data;
            // $scope.resourceMap=response.data;
            callbackFunction(response.data);
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

    //
    // getContentStatic(function(){
    //   $scope.getLeanItems=[]
    //   $scope.estimateItems=[]
    //   $scope.cncOperationItems=[]
    //   $scope.cmmOperationItems=[]
    //
    //   for (var i = 0; i < $scope.marketplaceItems.length; i++) {
    //     // $scope.allMktItems.push($scope.marketplaceItems[i]);
    //     if ($scope.marketplaceItems[i].categoryContent=='GET LEAN'){
    //       $scope.getLeanItems.push($scope.marketplaceItems[i])
    //     }
    //     else if ($scope.marketplaceItems[i].categoryContent=='IMPROVE ESTIMATES'){
    //       $scope.estimateItems.push($scope.marketplaceItems[i])
    //     }
    //
    //     else if ($scope.marketplaceItems[i].categoryContent=='IMPROVE CNC OPERATIONS'){
    //       $scope.cncOperationItems.push($scope.marketplaceItems[i])
    //     }
    //
    //     else{
    //       $scope.cmmOperationItems.push($scope.marketplaceItems[i])
    //     }
    //   }
    // });


    getContentStatic(function(resourceMap){
      $scope.allResources = [];
      $scope.resourceMap = resourceMap;
      var serviceIdList = [];
      var documentIdList = [];

      for (var i=0; i<resourceMap.length; i++) {
        documentIdList = mergeSet(documentIdList, resourceMap[i].categoryDocuments);
        serviceIdList = mergeSet(serviceIdList, resourceMap[i].categoryServices);
      }

      populateResourceData(dataFactory.getServices(), serviceIdList, "categoryServices");
      populateDocumentData(documentIdList, "categoryDocuments");
    })

    var mergeSet = function(existingSet, newSet) {
      newSet.forEach(function(x){
        if (existingSet.indexOf(x) == -1) {
          existingSet.push(x)
        }
      })
      return existingSet;
    }

    // var populateServiceData = function(serviceIds) {
    //   ajax.get(dataFactory.getServices(), {id: serviceIds}, function(response){
    //     $scope.resourceMap.forEach(function(resourceGroup){
    //       resourceGroup.contentSet = response.data.filter(function(service){
    //         return resourceGroup.categoryServices.indexOf(service.id) != -1
    //       })
    //     });
    //   });
    // }

    var populateResourceData = function(endpoint, ids, resourceType) {
      ajax.get(endpoint, {id: ids}, function(response){
          populateResourceDataCallback(response, resourceType);
      });
    }

    var populateDocumentData = function(ids, resourceType) {
      ids.forEach(function(id) {
        ajax.get(dataFactory.documentsUrl(id).getSingle, {}, function(response){
            populateResourceDataCallback({data: [response.data]}, resourceType);
        });
      })
    }

    var populateResourceDataCallback = function(response, resourceType) {
      $scope.resourceMap.forEach(function(resourceGroup){
        resourceGroup.contentSet = resourceGroup.contentSet || [];

        var matchingResources = response.data.filter(function(resource){
          return resourceGroup[resourceType].indexOf(resource.id) != -1;
        })

        resourceGroup.contentSet = resourceGroup.contentSet.concat(matchingResources);

      });

      // Create second list of all assets for all categories
      mergeSet($scope.allResources, response.data)
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
