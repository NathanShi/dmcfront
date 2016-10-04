'use strict';
/**
* dmc.dashboard Module
*
* Dashboard
*/

angular.module('dmc.dmdiiProj')
    .controller('DMCDmdiiProjectPageController',[
        '$state',
        '$stateParams',
        '$scope',
        '$rootScope',
        '$cookies',
        'ajax',
        'dataFactory',
        'socketFactory',
        '$location',
        'is_search',
        'DMCUserModel',
        '$window',
        function($state,
                 $stateParams,
                 $scope,
                 $rootScope,
                 $cookies,
                 ajax,
                 dataFactory,
                 socketFactory,
                 $location,
                 is_search,
                 DMCUserModel,
                 $window){

            $scope.searchModel = angular.isDefined($stateParams.text) ? $stateParams.text : null;

            var apply = function(){
                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
            };

            var userData = null;
            DMCUserModel.getUserData().then(function(res){
                userData = res;
            });

            $scope.projectLoading = true;

            var loadingData = function(start){ // progress line
                $scope.downloadData = start;
            };


            // callback for project
            var callbackFunction = function(response){
                $scope.project = response.data;

                ajax.get(dataFactory.getDMDIIProject().contributors, {projectId: $scope.project.id}, function(response) {
                    $scope.project.contributingCompanies = response.data;
                    $scope.projectLoading = false;
                });

                ajax.get(dataFactory.getDMDIIProject().updates, {limit: 5, projectId: $scope.project.id}, function(response) {
                    $scope.updates = response.data;
                    $scope.projectLoading = false;
                });

                ajax.get(dataFactory.documentsURL().getList, {
                    recent: 15,
                    page: null,
                    pageSize: null,
                    parentType: 'DMDII',
                    parentId: $scope.project.id
                }, function(response) {
                    $scope.documents = response.data.data;
                });

                ajax.get(dataFactory.documentsURL().getList, {
                    docClass: 'FINANCIAL',
                    parentType: 'DMDII',
                    parentId: $scope.project.id,
                    recent: 1
                }, function(response) {
                    $scope.projectFinancials = response.data.data[0];
                });

                ajax.get(dataFactory.documentsURL().getList, {
                    docClass: 'SCHEDULE',
                    parentType: 'DMDII',
                    parentId: $scope.project.id,
                    recent: 1
                }, function(response) {
                    $scope.projectSchedule = response.data.data[0];
                });

            };

            var responseData = function(){
                var data = {};
                return data;
            };

            $scope.getDMDIIProject = function(){
                loadingData(true);
                ajax.get(dataFactory.getDMDIIProject($stateParams.projectId).get, responseData(), callbackFunction);
            };
            $scope.getDMDIIProject();
		}
    ]
).filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });
