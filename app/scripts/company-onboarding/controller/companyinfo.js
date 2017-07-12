'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-companyinfoController', ['$scope', 'companyOnboardingModel', '$location', '$anchorScroll',
    function($scope, companyOnboardingModel, $location, $anchorScroll){
      $anchorScroll();

      $scope.orgType = [
        { selection : 'Public Company', selected : false },
        { selection : 'Educational', selected : false },
        { selection : 'Self Employed', selected : false },
        { selection : 'Government Agency', selected : false },
        { selection : 'Non Profit', selected : false },
        { selection : 'Self Owned', selected : false },
        { selection : 'Privately Held', selected : false },
        { selection : 'Partnership', selected : false }
      ];


      $scope.employeeSize = [
        {
          name: 'Self-employed',
          value: 'Self-employed'
        },
        {
          name: '1-10 employees',
          value: '1-10 employees'
        },
        {
          name: '11-50 employees',
          value: '11-50 employees'
        },
        {
          name: '51-200 employees',
          value: '51-200 employees'
        },
        {
          name: '501-1000 employees',
          value: '501-1000 employees'
        },
        {
          name: '1001-5000 employees',
          value: '1001-5000 employees'
        },
        {
          name: '5001-10,000 employees',
          value: '5001-10,000 employees'
        },
        {
          name: '10,000+ employees',
          value: '10,000+ employees'
        }
      ];

      $scope.annualRevenue = [
        {
          name: '0-25M',
          value: '0-25M'
        },
        {
          name: '26M-50M',
          value: '26M-50M'
        },
        {
          name: '51M-100M',
          value: '51M-100M'
        },
        {
          name: '101M-250M',
          value: '101M-250M'
        },
        {
          name: '251M-500M',
          value: '251M-500M'
        },
        {
          name: '501M-1B',
          value: '501M-1B'
        },
        {
          name: '2B-10B',
          value: '2B-10B'
        },
        {
          name: '11B+',
          value: '11B+'
        }
      ];

      $scope.isOptionsRequired = function(){
        return !$scope.orgType.some(function(options){
          return options.selected;
        });
      };

      $scope.company = companyOnboardingModel.get_companyInfo();
      $scope.company.selectedEmployeeSize = null;
      $scope.company.selectedAnnualRevenue = null;

      $scope.companyinfo = {};

      $scope.save = function(company) {
        var type = [];

        $scope.orgType.forEach(function(element) {
            if (element.selected == true)
              type.push(element.selection);
        });

        if (company.subCompany == undefined || company.subCompany == false){
            company.secondAddress = null;
        }

        if (company.financialContact == undefined || company.financialContact == false){
            company.finance = null;
        }

        if (company.legalContact == undefined || company.legalContact == false){
            company.legal = null;
        }

        $scope.companyinfo = angular.copy(company);
        $scope.companyinfo.selectedEmployeeSize = $scope.companyinfo.selectedEmployeeSize.value;
        $scope.companyinfo.selectedAnnualRevenue = $scope.companyinfo.selectedAnnualRevenue.value;
        $scope.companyinfo.type = type;

        companyOnboardingModel.save_companyInfo($scope.companyinfo);
        $location.path('/pay');
      };
}])

.controller('co-payController', ['$scope', 'companyOnboardingModel', '$location', '$anchorScroll',
    function($scope, companyOnboardingModel, $location, $anchorScroll){
      $anchorScroll();

      $scope.company = companyOnboardingModel.get_companyInfo();

      $scope.back = function(){
        companyOnboardingModel.save_companyInfo($scope.company);
        $location.path('/companyinfo');
      }
}])
