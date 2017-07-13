'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope, $cookies, $mdDialog){
      $cookies.put('fromDMDIISignup',true)

}])
