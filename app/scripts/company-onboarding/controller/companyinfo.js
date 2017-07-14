'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', 'userData', 'DMCUserModel', '$rootScope', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, userData, DMCUserModel, $rootScope, $cookies, $mdDialog){
      $cookies.put('fromDMDIISignup',true);

}])

.controller('co-companyinfoController', ['$scope', 'companyOnboardingModel', '$location', '$anchorScroll', '$rootScope', '$mdDialog',
    function($scope, companyOnboardingModel, $location, $anchorScroll, $rootScope, $mdDialog){
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

        company.selectedEmployeeSize = company.selectedEmployeeSize.value;
        company.selectedAnnualRevenue = company.selectedAnnualRevenue.value;
        $scope.companyinfo = angular.copy(company);
        $scope.companyinfo.type = type;

        companyOnboardingModel.save_companyInfo($scope.companyinfo);
        $location.path('/pay');
      };

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

      if ($rootScope.isLogged && !$rootScope.userData.termsConditions) {
        $scope.showModalTermsConditions();
      }

}])

.controller('co-payController', ['$scope', 'companyOnboardingModel', '$location', '$anchorScroll', '$http', 'dataFactory',
    function($scope, companyOnboardingModel, $location, $anchorScroll, $http, dataFactory){
      $anchorScroll();

      $scope.company = companyOnboardingModel.get_companyInfo();
      //
      //
      // if(angular.equals($scope.company, {}) || $scope.company.selectedEmployeeSize == null){
      //   var haveStored = $localStorage.get("companyInfo");
      //   console.log(haveStored);
      //   if (haveStored){
      //     $scope.company = haveStored;
      //   }
      //   else{
      //     //   $location.path('/companyinfo');
      //   }
      // }
      //
      // $localStorage.set("companyInfo",$scope.company);
      // var haveStored = $localStorage.get("companyInfo");
      // console.log($scope.company, haveStored);

      if (angular.equals($scope.company, {}) || $scope.company.selectedEmployeeSize == null){
              $location.path('/companyinfo');
      }

      $scope.back = function(){
        companyOnboardingModel.save_companyInfo($scope.company);
        $location.path('/companyinfo');
      }

      $scope.scroll = function(id){
        $scope.payment = true;
        var div = document.getElementById(id);
        $('body').animate({
          scrollTop: document.body.scrollHeight
        }, 1200);
      }

      //== Stripe ==
      // Create a Stripe client
      var stripe = Stripe('pk_test_xQ5iVIgTvkehDjRgvaj3kbRC');

      // Create an instance of Elements
      var elements = stripe.elements();

      // Custom styling can be passed to options when creating an Element.
      // (Note that this demo uses a wider set of styles than the guide below.)
      var style = {
        base: {
          color: '#32325d',
          lineHeight: '24px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      // Create an instance of the card Element
      var card = elements.create('card', {style: style});

      // Add an instance of the card Element into the `card-element` <div>
      card.mount('#card-element');

      // Handle real-time validation errors from the card Element.
      card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });

      // Handle form submission
      var form = document.getElementById('payment-form');
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server
            stripeTokenHandler(result.token);
          }
        });
      });

      function stripeTokenHandler(token) {

          var jsoninfo = companyInfotoJson(token);
          // console.log(jsoninfo);
          $http.post(dataFactory.payment().pay, jsoninfo)
            .then(function successCallback(response) {
              console.log("success");
            }, function errorCallback(response) {
              console.log("error");
            });

      }

      function companyInfotoJson(token){

          $scope.dmdiiMembershipInfo = {
            mainPointContact: $scope.company.main,
            financePointContact: $scope.company.finance,
            legalPointContact: $scope.company.legal,
            secondAddress: $scope.company.secondAddress,
            annualRevenue: $scope.company.selectedAnnualRevenue,
            employeeSize: $scope.company.selectedEmployeeSize,
            startUp: $scope.company.startUp,
            dunsCode: $scope.company.duns
          };

          var MembershipInfo = JSON.stringify($scope.dmdiiMembershipInfo);
          // console.log(MembershipInfo);

          $scope.payment = {
            stripeToken: token.id,
            organizationModel:{
              name:$scope.company.name,
              location:null,
              description:null,
              division:null,
              industry:null,
              naicsCode:$scope.company.naicsCode,
              email:null,
              phone:null,
              website:null,
              socialMediaLinkedin:null,
              socialMediaTwitter:null,
              socialMediaInthenews:null,
              perferedCommMethod:null,
              productionCapabilities:null,
              address:{
                streetAddress1:$scope.company.firstAddress.line1,
                streetAddress2:($scope.company.firstAddress.line2?$scope.company.firstAddress.line2:null),
                city:$scope.company.firstAddress.city,
                state:$scope.company.firstAddress.state,
                country:"US",
                zip:$scope.company.firstAddress.zipcode,
              },
              reasonJoining:null,
              featureImage:null,
              dmdiiMembershipInfo:MembershipInfo,
              awards:null,
              contacts:null,
              areasOfExpertise:null,
              desiredAreasOfExpertise:null,
              postCollaboration:null,
              upcomingProjectInterests:null,
              pastProjects:null
            }
          };

          var jsoninfo = angular.toJson($scope.payment);
          // console.log(jsoninfo);
          return angular.toJson($scope.payment);

      }

}])
