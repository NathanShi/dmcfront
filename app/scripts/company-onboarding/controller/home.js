'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope, $cookies, $mdDialog){
      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

      $scope.tierLevel = 'Tier3';

      $scope.clickSignup = function() {
        $cookies.put('fromDMDIISignup',true)
      }

      $scope.showModalTermsConditions = function(){
  			$mdDialog.show({
  			    controller: 'TermsConditionsController',
  			    templateUrl: 'templates/onboarding/terms-conditions.html',
  			    parent: angular.element(document.body),
  			    clickOutsideToClose: false
  		    })
  		    .then(function() {
  		    }, function() {
  		    });
  		}

      if (!$rootScope.userData.termsConditions) {
        $scope.showModalTermsConditions();
      }

}])
