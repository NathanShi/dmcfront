'use strict';

angular.module('dmc.dfars-assessment')
    .controller('DfarsController', ['$stateParams',
                                    '$state',
                                    "$scope",
                                    "ajax",
                                    "$location",
                                    "dataFactory",
                                    "toastModel",
                                    '$sce',
                                    'dfarsModules',
                                    'savedData',
                                    function ($stateParams,
                                              $state,
                                              $scope,
                                              ajax,
                                              $location,
                                              dataFactory,
                                              toastModel,
                                              $sce,
                                              dfarsModules,
                                              savedData) {

        $scope.modules = dfarsModules;
        $scope.state = {moduleId: 0, sectionId: 0};
        $scope.savedData = savedData;

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

        $scope.fieldCount = {};

        $scope.initFields = function(header){
          $scope.fieldCount[header] = 1;
        }

        $scope.addField = function(header) {
          $scope.fieldCount[header]++;
        };

        $scope.removeField = function(header) {
          $scope.fieldCount[header]--;
        };

        $scope.enableRemoveField = function(header, i) {
          return (i+1 == $scope.fieldCount[header]) && (i != 0);
        };

        $scope.newArray = function(n) {
          return new Array(n);
        }
    }]
);
