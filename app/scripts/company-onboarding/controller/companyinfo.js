'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, $cookies, $mdDialog){
      $cookies.put('fromDMDIISignup',true);

}])

.controller('co-companyinfoController', ['$scope', 'companyOnboardingModel', '$window', '$location', '$anchorScroll', 'ajax', 'dataFactory', 'storageService', '$rootScope', '$mdDialog',
    function($scope, companyOnboardingModel, $window, $location, $anchorScroll, ajax, dataFactory, storageService, $rootScope, $mdDialog){
      $anchorScroll();

      $scope.company = {};

      ajax.get(dataFactory.payment().organizations, {}, function(response){
        if (response.data.id != null){
          if (response.data.isPaid == false){
            $scope.company = companyOnboardingModel.transResponse(response.data);
            storageService.set('companyinfoCache', JSON.stringify($scope.company));
          }
          else{
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

      if (angular.equals($scope.company, {})){
          var haveStored = storageService.get('companyinfoCache');
          if (haveStored){
            $scope.company = JSON.parse(haveStored);
            storageService.remove('companyinfoCache');
          }
          else
            $scope.company = {};
      }

      $scope.company.selectedEmployeeSize = null;
      $scope.company.selectedAnnualRevenue = null;
      $scope.company.orgTYPEs = null;

      $scope.orgType = companyOnboardingModel.initialOrgType();

      $scope.employeeSize = companyOnboardingModel.initialEmployeeSize();

      $scope.annualRevenue = companyOnboardingModel.initialAnnualRevenue();

      $scope.orgTYPEs = companyOnboardingModel.initialOrgTYPEs();

      $scope.industryType = companyOnboardingModel.initialIndustryType();

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
        company.orgTYPEs = company.orgTYPEs.value;
        $scope.companyinfo = angular.copy(company);
        $scope.companyinfo.type = type;
        if ($scope.company.docuSigned){
          $scope.companyinfo.docuSigned = $scope.company.docuSigned;
        }
        else{
          $scope.companyinfo.docuSigned = false;
        }

        if ($scope.company.id){
          $scope.companyinfo.id = $scope.company.id;
        }

        var postDocInfo = companyOnboardingModel.populateField($scope.companyinfo);
        var docInfoJsonString = JSON.parse(angular.toJson(postDocInfo));
        console.log("docInfoJsonString", docInfoJsonString);

        ajax.create(dataFactory.esignOnline().docuSign, postDocInfo, function successCallback(response) {
            console.log("response.data.status", response.data.status);
            if (response.data.status == "eSignature Successful!"){
                var generatedForm = JSON.parse(response.data.reason);
                console.log(generatedForm);
                if (!generatedForm.template_id || !generatedForm.url){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(false)
                      .title('Error')
                      .content('Oops, we had a problem when generating Membership Agreement, pleas try again.')
                      .ok('OK')
                  )
                }
                else{
                  $scope.companyinfo.templateID = generatedForm.template_id;
                  $scope.companyinfo.formURL = generatedForm.url;
                }
            }
            else{
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Error')
                  .content(response.data.reason)
                  .ok('OK')
              )
            }
        }, function errorCallback(response) {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(false)
              .title('Error')
              .content('Oops, we had a problem when generating Membership Agreement, please try again later. If you kept having this problem, please contact us.')
              .ok('OK')
          );
        }).then(function(){
          if ($scope.companyinfo.templateID && $scope.companyinfo.formURL){
            storageService.set('companyinfoCache', JSON.stringify($scope.companyinfo));
            $window.open($scope.companyinfo.formURL);
          }

        });
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

      var haveStored = storageService.get('companyinfoCache');
      if (haveStored){
        $scope.company = JSON.parse(haveStored);
      }
      else{
        $location.path('/companyinfo');
      }

      console.log($scope.company);

      $scope.back = function(){
        storageService.set('companyinfoCache', JSON.stringify($scope.company));
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
                // console.log("jsoninfo", jsoninfo);


            });
          }

          ajax.get(dataFactory.esignOnline(jsoninfo.templateId).checkSignature, {}, function(response){
              console.log("eSignCheck", response.data);
              if (response.data.status == "eSignCheck Successful!"){
                if (response.data.reason != "0"){
                    $scope.submitOrgPayment(jsoninfo);
                }
                else{
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Alert')
                        .content('You haven\'t sign the Membership Agreement yet, please go back and sign it!')
                        .ok('OK')
                    );
                    $scope.back();
                }
             }
             else {
               $mdDialog.show(
                 $mdDialog.alert()
                   .clickOutsideToClose(false)
                   .title('Alert')
                   .content('Oops, something went wrong, please try again later. If you kept having this problem, please contact us.')
                   .ok('OK')
               );
             }
          });

      }

      $scope.submitOrgPayment = function(info){
          storageService.remove('companyinfoCache');
          ajax.create(dataFactory.payment().pay, info, function successCallback(response) {
            if (response.data.status == "succeeded"){
<<<<<<< HEAD
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Great')
                  .content('Successful payment! Redirect to dashboard.')
                  .ok('OK')
              ).then(function(){
                $window.location.href = '/onboarding.php';
              });
=======
              alert("Successful payment! Redirect to dashboard");
              // $window.location.href = '/onboarding.php';
              $window.location.href = '/marketplace.php';
              // $('#successPay').modal('show');
              // console.log("success");
>>>>>>> origin/maz-add-doc-upload-for-docent-II
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
            orgTYPEs: $scope.company.orgTYPEs,
            docuSigned: $scope.company.docuSigned,
            templateID: $scope.company.templateID,
            formURL: $scope.company.formURL
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
