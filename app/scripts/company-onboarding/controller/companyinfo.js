'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, $cookies, $mdDialog){
      $cookies.put('fromDMDIISignup',true);

}])

.controller('co-companyinfoController', ['$scope', 'companyOnboardingModel', '$window', '$location', '$anchorScroll', 'ajax', 'dataFactory', '$rootScope', '$mdDialog',
    function($scope, companyOnboardingModel, $window, $location, $anchorScroll, ajax, dataFactory, $rootScope, $mdDialog){
      $anchorScroll();

      $scope.linkToPage = function(){
        $window.location.href = '/onboarding.php';
      }

      $scope.company = companyOnboardingModel.get_companyInfo();
      if (angular.equals($scope.company, {})){
          ajax.get(dataFactory.payment().organizations, {}, function(response){
            if (response.data.id != null){
              if (response.data.isPaid == false){
                transResponse(response.data);
                // console.log($scope.company);
                companyOnboardingModel.save_companyInfo($scope.company);
                // $location.path('/pay');
              }

              else{
                // alert("You already have a Tier3 Membership organization database, will redirect to dashboard");
                // $window.location.href = '/onboarding.php';
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Alert')
                    .content('You already have a Tier3 Membership organization database, will redirect to dashboard.')
                    .ok('Got it!')
                ).then(function(){
                  $window.location.href = '/onboarding.php';
                });
              }
            }
          });
      }

      function transResponse(data){
        $scope.company.name = data.name;
        $scope.company.id = data.id;
        $scope.company.naicsCode = data.naicsCode;
        $scope.company.firstAddress = {};
        $scope.company.firstAddress.line1 = data.address.streetAddress1;
        $scope.company.firstAddress.line2 = data.address.streetAddress2;
        $scope.company.firstAddress.city = data.address.city;
        $scope.company.firstAddress.state = data.address.state;
        $scope.company.firstAddress.zipcode = data.address.zip;

        var jsonType = angular.fromJson(data.dmdiiMembershipInfo);
        // console.log(jsonType);
        $scope.company.main = jsonType.mainPointContact;
        $scope.company.finance = jsonType.financePointContact;
        $scope.company.tech = jsonType.techPointContact;
        $scope.company.legal = jsonType.legalPointContact;
        if ($scope.company.tech != null)
          $scope.company.techContact = true;
        if ($scope.company.finance != null)
          $scope.company.financialContact = true;
        $scope.company.legal = jsonType.legalPointContact;
        if ($scope.company.legal != null)
          $scope.company.legalContact = true;
        $scope.company.secondAddress = jsonType.secondAddress;
        if ($scope.company.secondAddress != null)
          $scope.company.subCompany = true;
        $scope.company.selectedAnnualRevenue = null;
        $scope.company.selectedEmployeeSize = null;
        $scope.company.agreement = null;
        $scope.company.type = null;
        $scope.company.website = jsonType.website;
        $scope.company.startUp = jsonType.startUp;
        $scope.company.duns = jsonType.dunsCode;
      }

      $scope.company.selectedEmployeeSize = null;
      $scope.company.selectedAnnualRevenue = null;
      $scope.company.TYPE = null;
      // $scope.company.agreement = null;

      $scope.orgType = [
        { selection : 'Parent Consortium', selected : false },
        { selection : 'Subsidiary', selected : false },
        { selection : 'Minority Owned Business', selected : false },
        { selection : 'Non-Profit', selected : false },
        { selection : 'US Owned', selected : false },
        { selection : 'Under an SSA', selected : false },
        { selection : 'Academic Institution', selected : false },
        { selection : 'Foreign Firm', selected : false },
        { selection : 'Division', selected : false },
        { selection : 'Woman Owned Business', selected : false }
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

      $scope.orgTYPEs = [
        {
          name: 'Manufacturer',
          value: 'Manufacturer'
        },
        {
          name: 'Technology Provider',
          value: 'Technology Provider'
        },
        {
          name: 'Consultant',
          value: 'Consultant'
        }
      ];

      $scope.industryType = [
        { inType : '3D Printing', select : false },
        { inType : 'Aerospace', select : false },
        { inType : 'Agricultural', select : false },
        { inType : 'Automation', select : false },
        { inType : 'Die Casting', select : false },
        { inType : 'Electrical', select : false },
        { inType : 'Electronics', select : false },
        { inType : 'Furniture', select : false },
        { inType : 'Grinding Machines', select : false },
        { inType : 'Machine', select : false },
        { inType : 'Materials', select : false },
        { inType : 'Marine engines', select : false },
        { inType : 'Measurement', select : false },
        { inType : 'Metal', select : false },
        { inType : 'Medical', select : false },
        { inType : 'Nuclear Power', select : false },
        { inType : 'Science', select : false },
      ];

      $scope.isOptionsRequired = function(){
        return !$scope.orgType.some(function(options){
          return options.selected;
        });
      };



      $scope.companyinfo = {};

      $scope.save = function(company) {
        var type = [];

        $scope.orgType.forEach(function(element) {
            if (element.selected == true)
              type.push(element.selection);
        });

        if (!company.subCompany){
            company.secondAddress = null;
        }

        if (!company.techContact){
            company.tech = null;
        }

        if (!company.financialContact){
            company.finance = null;
        }

        if (!company.legalContact){
            company.legal = null;
        }

        company.selectedEmployeeSize = company.selectedEmployeeSize.value;
        company.selectedAnnualRevenue = company.selectedAnnualRevenue.value;
        company.TYPE = company.TYPE.value;
        $scope.companyinfo = angular.copy(company);
        $scope.companyinfo.type = type;
        if ($scope.company.id)
          $scope.companyinfo.id = $scope.company.id;

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

.controller('co-payController', ['$scope', 'companyOnboardingModel', '$location', '$anchorScroll', '$window', 'dataFactory', 'ajax', 'storageService', '$mdDialog',
    function($scope, companyOnboardingModel, $location, $anchorScroll, $window, dataFactory, ajax, storageService, $mdDialog){
      $anchorScroll();
      $scope.isDisabled = false;

      $scope.company = companyOnboardingModel.get_companyInfo();
      if(angular.equals($scope.company, {}) || $scope.company.selectedEmployeeSize == null){
          var haveStored = storageService.get('companyinfoCache');
          if (haveStored){
              $scope.company = JSON.parse(haveStored);
          }

          else{
              $location.path('/companyinfo');
          }
      }
      else{
          storageService.set('companyinfoCache', JSON.stringify($scope.company));
      }

      // if (angular.equals($scope.company, {}) || $scope.company.selectedEmployeeSize == null){
      //         $location.path('/companyinfo');
      // }

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
        $scope.disableButton();
        // changeButton();

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

      $scope.enableButton = function(){
        $scope.isDisabled = false;
      }

      $scope.disableButton = function(){
        $scope.isDisabled = true;
      }

      function stripeTokenHandler(token) {

          var jsoninfo = companyInfotoJson(token);
          storageService.remove('companyinfoCache');

          if (!jsoninfo.id){
            ajax.get(dataFactory.payment().organizations, {}, function(response){
              if (response.data.name != null){
                if (response.data.isPaid == false){
                  jsoninfo.organizationModel.id = response.data.id;
                  // console.log("jsoninfo.id", jsoninfo.organizationModel.id);
                }

                else{
                  // alert("You already have a Tier3 Membership organization database, will redirect to dashboard");
                  // $window.location.href = '/onboarding.php';
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(false)
                      .title('Alert')
                      .content('You already have a Tier3 Membership organization database, will redirect to dashboard.')
                      .ok('Got it!')
                  ).then(function(){
                    $window.location.href = '/onboarding.php';
                  });
                }
              }
            }).then(function(){
              // console.log("jsoninfo", jsoninfo.organizationModel.id);
              if (!jsoninfo.organizationModel.id)
                jsoninfo.organizationModel.id = null;
                console.log("jsoninfo", jsoninfo);
              // $scope.submitOrgPayment(jsoninfo);
            });
          }
          else {
              console.log("jsoninfo", jsoninfo);
              // $scope.submitOrgPayment(jsoninfo);
          }

      }

      $scope.submitOrgPayment = function(info){
          ajax.create(dataFactory.payment().pay, info, function successCallback(response) {
            if (response.data.status == "succeeded"){
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Great')
                  .content('Successful payment! Redirect to dashboard.')
                  .ok('OK')
              ).then(function(){
                $window.location.href = '/onboarding.php';
              });
            }
            else if (response.data.status == "failed"){
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Alert')
                  .content(response.data.reason)
                  .ok('OK')
              );
            }
          }, function errorCallback(response) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Alert')
                .content('Oops, something went wrong, please contact us.')
                .ok('OK')
            );
          }).then(function(){
              $scope.enableButton();
              // $scope.flag = false;
          });
      }

      $scope.linkToPage = function(){
        $window.location.href = '/onboarding.php';
      }

      function companyInfotoJson(token){

          $scope.dmdiiMembershipInfo = {
            mainPointContact: $scope.company.main,
            financePointContact: $scope.company.finance,
            legalPointContact: $scope.company.legal,
            techPointContact: $scope.company.tech,
            secondAddress: $scope.company.secondAddress,
            annualRevenue: $scope.company.selectedAnnualRevenue,
            employeeSize: $scope.company.selectedEmployeeSize,
            startUp: $scope.company.startUp,
            dunsCode: $scope.company.duns,
            applicantType: $scope.company.type,
            orgType: $scope.company.TYPE,
          };

          var MembershipInfo = JSON.stringify($scope.dmdiiMembershipInfo);

          $scope.payment = {
            stripeToken: token.id,
            organizationModel:{
              name:$scope.company.name,
              id: $scope.company.id ? $scope.company.id : null,
              location:null,
              description:null,
              division:null,
              industry:null,
              naicsCode:$scope.company.naicsCode,
              email:null,
              phone:null,
              website:$scope.company.website,
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

          // var jsoninfo = angular.toJson($scope.payment);
          // // console.log(jsoninfo);
          return $scope.payment;

      }

}])
