'use strict';

angular.module('dmc.widgets.companyonboardingTabs',[])
.directive('signupTabs', function () {
    return {
        restrict: 'E',
        controller: 'uiWidgetCompanyOnboardingTabs',
        templateUrl: 'templates/components/ui-widgets/company-onboarding-tab.html',
        scope: {
            currentStage: '@'
        }
    };
})

.controller('uiWidgetCompanyOnboardingTabs', ['$scope',
    function($scope){
      $scope.steps = [
        {icon:'person_add', content:'Create Account'},
        {icon:'business', content:'Company Information'},
        {icon:'description', content:'Confirm Information'},
        {icon:'credit_card', content:'Payment Information'}
      ];


      $scope.checkComplete = function(index){
        if (index < $scope.currentStage)
          return '<ng-md-icon icon={{$scope.steps[index+1].icon}} style="fill:#75bc52" size="28"></ng-md-icon>';
        else
          return '<ng-md-icon icon={{$scope.steps[index+1].icon}} style="fill:#6e797a" size="28"></ng-md-icon>';
      }

}])
