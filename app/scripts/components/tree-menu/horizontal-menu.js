'use strict';
/**
* dmc.component.treemenu Module
*
* DMC Tree Menu
*/
angular.module('dmc.component.horizontalmenu', [
    'RecursionHelper'
]).
  directive('dmcHorizontalMenu', ['$window', function($window) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
          treeSource: '='
        },
        templateUrl: 'templates/components/tree-menu/horizontal-menu-tpl.html',
        controller: function($scope){
            $scope.clearUrl = $window.location.href.split('?')[0];

            $scope.makeFilterName = function(s){
              return s.replace(/ /g,'');
            }
        }
      };
  }]
)
