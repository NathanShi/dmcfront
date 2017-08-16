'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, $cookies, $mdDialog){
      $cookies.put('fromDMDIISignup',true);

}])

.controller('co-companyinfoController', ['$scope',
                                         'companyOnboardingModel',
                                         '$window',
                                         '$location',
                                         '$anchorScroll',
                                         'ajax',
                                         'dataFactory',
                                         'storageService',
                                         '$rootScope',
                                         '$timeout',
                                         '$mdDialog',
    function($scope,
             companyOnboardingModel,
             $window,
             $location,
             $anchorScroll,
             ajax,
             dataFactory,
             storageService,
             $rootScope,
             $timeout,
             $mdDialog){

      $anchorScroll();

      $scope.isDisabled = false;

      // $scope.shouldDisable = function(formValid){
      //     if ($scope.isDisabled)
      //       return true;
      //     else{
      //       return formValid;
      //     }
      // }

      $scope.enableButton = function(){
        $scope.isDisabled = false;
      }

      $scope.disableButton = function(){
        $scope.isDisabled = true;
      }

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
          if (haveStored && !angular.isUndefined(haveStored)){
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

        $scope.disableButton();
        console.log($scope.isDisabled);

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
          $scope.companyinfo.docuSigned = "Requested";
        }

        if ($scope.company.id){
          $scope.companyinfo.id = $scope.company.id;
        }

        var postDocInfo = companyOnboardingModel.populateField($scope.companyinfo);
        var responseErrorReason = "Oops, we had a problem when generating Membership Agreement, please try again later. " +
        "\nIf you kept having this problem, please contact us.";

        ajax.create(dataFactory.esignOnline().docuSign, postDocInfo, function successCallback(response) {
            if (response.data.status == "eSignature Successful!"){
                var generatedForm = JSON.parse(response.data.reason);
                console.log(generatedForm);
                if (generatedForm.template_id && generatedForm.url){
                  $scope.companyinfo.templateID = generatedForm.template_id;
                  $scope.companyinfo.formURL = generatedForm.url;
                }
            }
            else{
              responseErrorReason = response.data.reason
            }
        }, function errorCallback(response) {
           responseErrorReason = "Error when calling for e-sign API. \nIf you kept having this problem, please contact us.";
        }).then(function(){
          if ($scope.companyinfo.templateID && $scope.companyinfo.formURL){
          // if (true){//Testing
            storageService.set('companyinfoCache', JSON.stringify($scope.companyinfo))
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Generating Membership Agreement')
                .content('Redirecting in 5 seconds, if this not work please open this link: ' + $scope.companyinfo.formURL)
                .ok('OK')
            ).then(function(){
              $timeout( function(){
                // alert("redirecting : " + $scope.companyinfo.formURL);
                $window.location.href = $scope.companyinfo.formURL;
              }, 1000);
            });
          }
          else{
          // if (true){//Testing
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Error')
                .content(responseErrorReason)
                .ok('OK')
            );
          }

          $scope.enableButton();
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

.controller('co-payController', ['$scope',
                                 'companyOnboardingModel',
                                 '$location',
                                 '$anchorScroll',
                                 '$window',
                                 'dataFactory',
                                 'ajax',
                                 'storageService',
                                 '$mdDialog',
                                 '$timeout',
    function($scope,
             companyOnboardingModel,
             $location,
             $anchorScroll,
             $window,
             dataFactory,
             ajax,
             storageService,
             $mdDialog,
             $timeout){

      $anchorScroll();
      $scope.isDisabled = false;

      var haveStored = storageService.get('companyinfoCache');
      if (haveStored && !angular.isUndefined(haveStored)){
        $scope.company = JSON.parse(haveStored);
      }

      console.log($scope.company);

      if (!$scope.company){
        // alert("back to /companyinfo");
        $location.path('/companyinfo');
      }
      else{
        var errorReason = "null";
        if ($scope.company.docuSigned != "Signed"){
          ajax.get(dataFactory.esignOnline($scope.company.templateID).checkSignature, {}, function(response){
              console.log("eSignCheck", response.data);
              if (response.data.status == "eSignCheck Successful!"){
                  if (response.data.reason != "0"){
                      $scope.company.docuSigned = "Signed";
                  }
                  else{
                      errorReason = "You haven\'t sign the Membership Agreement yet, please go back and sign it!"
                  }
              }
              else {
                  $scope.company.docuSigned = "Unable to Check"
                  errorReason = "Oops, something went wrong, please try again later. If you kept having this problem, please contact us."
              }
          }).then(function(){
            if (errorReason != "null"){
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Error')
                  .content(errorReason)
                  .ok('OK')
              );
            }
          }).then(function(){
              if ($scope.company.docuSigned == "Requested"){
                  if ($scope.company.templateID){
                    storageService.set('companyinfoCache', JSON.stringify($scope.company));
                      $timeout(function(){
                        // alert("redirecting : " + $scope.companyinfo.formURL); //TEsting
                        $window.location.href = $scope.companyinfo.formURL;
                      }, 1000);
                    }
                  else{
                    $timeout(function(){
                      alert("redirecting : back");
                      // $scope.back();
                    }, 5000);
                  }
              }
          });
        }
      }

      $scope.back = function(){
        if ($scope.company){
          storageService.set('companyinfoCache', JSON.stringify($scope.company));
        }
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
            }).then(function(){
              if (!jsoninfo.organizationModel.id)
                jsoninfo.organizationModel.id = null;
            });
          }

          ajax.get(dataFactory.esignOnline(jsoninfo.dmdiiMembershipInfo.templateId).checkSignature, {}, function(response){
              console.log("jsoninfo", jsoninfo);
              console.log("checkSignature when pay", response.data);
              if (response.data.status == "eSignCheck Successful!"){
                if (response.data.reason == "null"){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(false)
                      .title('Alert')
                      .content('Oops, something went wrong, please try again later. If you kept having this problem, please contact us.')
                      .ok('OK')
                  );
                }
                else if (response.data.reason == "0"){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title('Alert')
                        .content('You haven\'t sign the Membership Agreement yet, please go back and sign it!')
                        .ok('OK')
                    );
                    $scope.back();
                }
                else{
                    jsoninfo.dmdiiMembershipInfo.docuSigned = "Signed";
                    $scope.submitOrgPayment(jsoninfo);
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

          var MembershipInfo = JSON.stringify($scope.dmdiiMembershipInfo);
          info.dmdiiMembershipInfo = MembershipInfo;
          console.log("info.dmdiiMembershipInfo", info.dmdiiMembershipInfo);

          ajax.create(dataFactory.payment().pay, info, function successCallback(response) {
            if (response.data.status == "succeeded"){
              storageService.remove('companyinfoCache');
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Great')
                  .content('Successful payment! Redirect to dashboard.')
                  .ok('OK')
              ).then(function(){
                alert("Beta Test Version, should redirect in release version");
                // $window.location.href = '/onboarding.php';
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
              dmdiiMembershipInfo:$scope.dmdiiMembershipInfo,
              awards:null,
              contacts:null,
              areasOfExpertise:null,
              desiredAreasOfExpertise:null,
              postCollaboration:null,
              upcomingProjectInterests:null,
              pastProjects:null
            }
          };
          return $scope.payment;
      }

}])
