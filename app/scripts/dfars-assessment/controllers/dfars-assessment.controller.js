'use strict';

angular.module('dmc.dfars-assessment')
    .controller('DfarsController', ['$stateParams',
                                    '$state',
                                    "$scope",
                                    "ajax",
                                    "$location",
                                    "dataFactory",
                                    "toastModel",
                                    'states',
                                    function ($stateParams,
                                              $state,
                                              $scope,
                                              ajax,
                                              $location,
                                              dataFactory,
                                              toastModel,
                                              states) {

        $scope.states = states;
        //$scope.state = states.findIndex(function(mod){return mod.state == $state.current.name;});
        $scope.state = 0;

        $scope.router = function(direction){
          return direction == 'next' ? $scope.states[++$scope.state].state : $scope.states[--$scope.state].state;
        }

        // $scope.routePage = function(direction){
        //   $state.go($scope.router(direction));
        // }
        $scope.routePage = function(destination){
          switch (destination) {
            case 'next':
              ++$scope.state;
              break;
            case 'previous':
              --$scope.state;
              break;
            default:
              $scope.state = states.findIndex(function(mod){return mod.state == destination;});
          }
        }
    }]
);
