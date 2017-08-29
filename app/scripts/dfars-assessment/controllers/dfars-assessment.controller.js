'use strict';

angular.module('dmc.dfars-assessment')
    .controller('DfarsController', ['$stateParams',
                                    '$state',
                                    "$scope",
                                    "ajax",
                                    "$location",
                                    "dataFactory",
                                    "toastModel",
                                    'dfarsModules',
                                    '$sce',
                                    function ($stateParams,
                                              $state,
                                              $scope,
                                              ajax,
                                              $location,
                                              dataFactory,
                                              toastModel,
                                              dfarsModules, $sce) {

        $scope.modules = dfarsModules;
        $scope.state = {moduleId: 0, sectionId: 0};
        $scope.principals = [{"name": "John Doe", "title": "President"}, {"name": "Jane Doe", "title": "Information Technology Officer"}];

        var nextModule = function(){
          ++$scope.state.moduleId;
          $scope.state.sectionId = 0;
        }

        var previousModule = function(){
          --$scope.state.moduleId;
          $scope.state.sectionId = 0;
        }

        $scope.routePage = function(direction, moduleId, sectionId){
          switch (direction) {
            case 'next':
              if($scope.sections.length == 0){
                nextModule();
              }
              else{
                $scope.state.sectionId = ($scope.state.sectionId + 1) % $scope.sections.length;
                if ($scope.state.sectionId == 0){
                  nextModule();
                }
              }
              break;
            case 'previous':
              if($scope.sections.length == 0){
                previousModule();
              }
              else{
                $scope.state.sectionId = ($scope.state.sectionId - 1) % $scope.sections.length;
                if ($scope.state.sectionId == -1){
                  previousModule();
                }
              }
              break;
            default:
              $scope.state.moduleId = moduleId;
              $scope.state.sectionId = sectionId;
              break;
          }
        }

        $scope.isStartModule = function(){
          return $scope.state.moduleId == 0;
        }

        $scope.hidePrevious = function(){
          return $scope.isStartModule() && $scope.state.sectionId == 0;
        }

        $scope.isFinishModule = function(mod){
          return $scope.state.moduleId == $scope.modules.length - 1;
        }

        $scope.isRequirementModule = function(mod){
          return !$scope.isStartModule() && !$scope.isFinishModule();
        }

        $scope.getSections = function(){
          return ajax.get(dataFactory.dfarsAssessment($scope.state.moduleId).getSections, {}, function(response){return response.data;});
        }

        $scope.$watch('state.moduleId', function() {
    		    $scope.getSections().then(function(response){$scope.sections = response.sections;});
    		});

        $scope.trustedHtml = function (plainText) {
          return $sce.trustAsHtml(plainText);
        }

        $scope.makeLabel = function(label) {
          label = label.replace(/([A-Z])/g, ' $1').trim();
          label = label.charAt(0).toUpperCase() + label.slice(1);
          return label;
        }
    }]
);
