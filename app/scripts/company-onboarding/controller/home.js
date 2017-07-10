'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope){
      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

      $scope.tierLevel = 'Tier3';

}])
