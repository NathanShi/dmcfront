'use strict';

angular.module('dmc.company.onboarding')
.controller('co-onboardingController', ['$scope', 'companyOnboardingModel',
    function($scope, companyOnboardingModel){

}])

.controller('co-homeController', ['$scope', 'companyOnboardingModel', '$cookies', '$mdDialog',
    function($scope, companyOnboardingModel, $cookies, $mdDialog){

      //Set up cookie for sign in process
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

      //Next button control
      $scope.isDisabled = false;

      $scope.enableButton = function(){
        $scope.isDisabled = false;
      }

      $scope.disableButton = function(){
        $scope.isDisabled = true;
      }

      $scope.company = {};

      //Call '/organization/user' to retrieve organization info in database
      ajax.get(dataFactory.payment().organizations, {}, function(response){
        if (response.data.id != null){
          if (response.data.isPaid == false){
            //Call service.transResponse() to stream data to form
            $scope.company = companyOnboardingModel.transResponse(response.data);
            storageService.set('companyinfoCache', JSON.stringify($scope.company));
          }
          else{
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(false)
                .title('Alert')
                .content('You already have a Tier3 Membership organization in database, will redirect to dashboard.')
                .ok('Got it!')
            ).then(function(){
              $window.location.href = '/onboarding.php';
            });
          }
        }
      });

      //If no info in database, check if user is back from payment page
      //Using localStorage
      if (angular.equals($scope.company, {})){
          var haveStored = storageService.get('companyinfoCache');
          if (haveStored && !angular.isUndefined(haveStored)){
            $scope.company = JSON.parse(haveStored);
            storageService.remove('companyinfoCache');
          }
          else
            $scope.company = {};
      }

      //Initialize form to fill. function in '/company-onboarding.js'
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

      //Form submission
      $scope.save = function(company) {

        $scope.disableButton();

        var type = [];

        //Serialize form information to $scope.companyinfo
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

        //eSignature Requested
        // $scope.companyinfo.docuSigned = "Signed"; //Test
        // $scope.companyinfo.templateID = "129999710"; //Test
        $scope.companyinfo.docuSigned = "Requested";

        if ($scope.company.id){
          $scope.companyinfo.id = $scope.company.id;
        }

        //Call service.populateField() to stream info for Membership Agreement
        var postDocInfo = companyOnboardingModel.populateField($scope.companyinfo);
        // console.log(postDocInfo);
        var responseErrorReason = "Oops, we had a problem when generating Membership Agreement, please try again later. " +
        "\nIf you kept having this problem, please contact us.";
        storageService.set('companyinfoCache', JSON.stringify($scope.companyinfo))

        ajax.get(dataFactory.esignOnline().esignToken, {}, function successCallback(response) {
              if (response.data.status == "eSignToken Successful!"){
                  $scope.companyinfo.token = response.data.reason;
              }
              else{
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(false)
                      .title('Error')
                      .content(response.data.reason)
                      .ok('OK')
                  );
              }
        }, function errorCallback(response) {
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Error')
                  .content(responseErrorReason)
                  .ok('OK')
              );
        }).then(function(){

          //Call 'esignDoc' to call PDFfiller API to generate Membership Agreement with populated fields
          ajax.create(dataFactory.esignOnline().docuSign, postDocInfo, function successCallback(response) {
              if (response.data.status == "eSignature Successful!"){
                  var generatedForm = JSON.parse(response.data.reason);
                  //Response will contain template_id & url
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
              //localStorage the form together with template_id & url
              storageService.set('companyinfoCache', JSON.stringify($scope.companyinfo))
              console.log($scope.companyinfo.formURL + "?token=" + $scope.companyinfo.token);
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Successfully Generate Membership Agreement')
                  .content('Please click OK to proceed, if this doesn\'t work please contact us')
                  .ok('OK')
              ).then(function(){
                $timeout( function(){
                  //Go to the Membership Agreement URL
                  if (!angular.isUndefined($scope.company.token)){
                    $window.location.href = $scope.company.formURL + "?token=" +$scope.company.token;
                  }
                  else {
                    $window.location.href = $scope.company.formURL
                  }
                }, 500);
              });
            }
            else{
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

        });

      };

      //Show Modal
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

      //Get data from localStorage
      var haveStored = storageService.get('companyinfoCache');
      if (haveStored && !angular.isUndefined(haveStored)){
        $scope.company = JSON.parse(haveStored);
      }

      //Check if exists
      if (!$scope.company){
        $location.path('/companyinfo');
      }
      else{
        var errorReason = "null";
        if ($scope.company.docuSigned != "Signed"){
          //Call 'esignCheck/template_id' to check if the Membership Agreement has signed
          ajax.get(dataFactory.esignOnline($scope.company.templateID).checkSignature, {}, function(response){
              if (response.data.status == "eSignCheck Successful!"){
                  var Signature = JSON.parse(response.data.reason);
                  if (Signature.total > 0){
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
                  .title('Alert')
                  .content(errorReason)
                  .ok('OK')
              );
            }
          }).then(function(){
              if ($scope.company.docuSigned == "Requested"){
                  if ($scope.company.templateID){
                    //If not signed go to the url and sign it.
                    storageService.set('companyinfoCache', JSON.stringify($scope.company));
                      $timeout(function(){
                          if (!angular.isUndefined($scope.company.token)){
                            $window.location.href = $scope.company.formURL + "?token=" +$scope.company.token;
                          }
                          else {
                            $window.location.href = $scope.company.formURL
                          }
                      }, 1000);
                    }
                  else{
                    //If no template_id found, go back to companyinfo page
                    $timeout(function(){
                      $scope.back();
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

          //call to retrieve company id
          if (!$scope.company.id || angular.isUndefined($scope.company.id)){
            //call '/organization/user' to retrieve organization id
            ajax.get(dataFactory.payment().organizations, {}, function(response){
              if (response.data.name != null){
                if (response.data.isPaid == false){
                  $scope.company.id = response.data.id;
                }

                else{
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(false)
                      .title('Alert')
                      .content('You already have a Tier3 Membership organization in database, will redirect to dashboard.')
                      .ok('Got it!')
                  ).then(function(){
                    $window.location.href = '/onboarding.php';
                  });
                }
              }
            }).then(function(){
              if (!$scope.company.id)
                $scope.company.id = null;

                //Call 'esignCheck/template_id' to check if the Membership Agreement has signed again
                ajax.get(dataFactory.esignOnline($scope.company.templateID).checkSignature, {}, function(response){
                    // console.log("response",response);
                    if (response.data.status == "eSignCheck Successful!"){
                      if (response.data.reason == "Error when calling the API"){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('Alert')
                            .content(response.data.reason + ', please try again later. If you kept having this problem, please contact us.')
                            .ok('OK')
                        );
                      }
                      else{
                        // var Signature = JSON.parse(response.data.reason);
                        var Signature = response.data.reason; //Test
                        $scope.signedInfo = Signature.items;
                        // console.log("Signature", $scope.signedInfo);
                        if (Signature.total == 0){
                            $mdDialog.show(
                              $mdDialog.alert()
                                .clickOutsideToClose(false)
                                .title('Alert')
                                .content('You haven\'t sign the Membership Agreement yet, please go back and sign it!')
                                .ok('OK')
                            ).then(function(){
                                if (!angular.isUndefined($scope.company.token)){
                                  $window.location.href = $scope.company.formURL + "?token=" +$scope.company.token;
                                }
                                else {
                                  $window.location.href = $scope.company.formURL
                                }
                            });
                        }
                        else{
                            //Signed, verify first then go to payment
                            $scope.company.docuSigned = "Signed";
                            $scope.company.verifiedSignatures = [];
                            Signature.items.forEach(function(element){
                                if (element.user == "same"){
                                  $scope.company.verifiedSignatures.push(element);
                                }
                            });

                            $mdDialog.show({
                                scope: $scope,
                                preserveScope: true,
                                clickOutsideToClose: false,
                                template: '<md-dialog>' +
                                          ' <md-toolbar class="md-toolbar-tools">' +
                                          '     <h3 style="color:white;">Please Confirm the Signature</h3>' +
                                          '     <span flex></span>' +
                                          '     <md-button class="md-icon-button md-primary" style="padding-top:5px" ng-click="closeDialog()">' +
                                          '        <ng-md-icon icon="close" style="fill:white"></ng-md-icon>' +
                                          '     </md-button>' +
                                          ' </md-toolbar>' +
                                          ' <md-dialog-content class="rows">' +
                                          '   <h5>We found following signature information of Membership Agreement</h5>' +
                                          '   <table class="table">' +
                                          '     <thead>' +
                                          '       <td>Name</td>' +
                                          '       <td>Email</td>' +
                                          '       <td>IP</td>' +
                                          '       <td>Date</td>' +
                                          '     </thead>' +
                                          '     <tr ng-repeat="signature in signedInfo" ng-class="(signature.user === \'same\') ? \'success\':\'danger\'">' +
                                          '       <td>{{ signature.name }}</td>' +
                                          '       <td>{{ signature.email }}</td>' +
                                          '       <td>{{ signature.ip }}</td>' +
                                          '       <td>{{ signature.date + \'000\' | date: \'medium\'}}</td>' +
                                          '     </tr>' +
                                          '   </table>' +
                                          '   <h5>If you notice any unrecognized rows, please contact us immediately.</h5>' +
                                          ' </md-dialog-content>' +
                                          ' <md-dialog-actions align="end" style="order: 2;margin-bottom: 20px;">' +
                                          '   <md-button class="md-raised md-warn" ng-click="answer(\'Back\')">' +
                                          '     Go back and Sign' +
                                          '   </md-button>' +
                                          '   <md-button class="md-raised md-primary" style="color:white;" ng-click="answer(\'Confirm\')">' +
                                          '     Confirm' +
                                          '   </md-button>' +
                                          ' </md-dialog-actions>' +
                                          '</md-dialog>',
                                controller: function eSignDialogController($scope, $mdDialog) {
                                  $scope.closeDialog = function() {
                                    $mdDialog.hide();
                                  };
                                  //
                                  $scope.answer = function(answer) {
                                    $mdDialog.hide(answer);
                                  };
                                }
                            }).then(function(answer){
                                if (answer == "Confirm"){
                                    alert("Confirm");//Test
                                    var orgPayEsignOBJ = companyOnboardingModel.matchOrgType($scope.company, token.id);//Test
                                    console.log("orgPayEsignOBJ", orgPayEsignOBJ);//Test
                                    // $scope.submitOrgPayment($scope.company, token);
                                }
                                else if (answer == "Back"){
                                    $scope.enableButton();
                                    alert("Back");//Test
                                    // if (!angular.isUndefined($scope.company.token)){
                                    //   $window.location.href = $scope.company.formURL + "?token=" +$scope.company.token;
                                    // }
                                    // else {
                                    //   $window.location.href = $scope.company.formURL
                                    // }
                                }
                                else{
                                    $scope.enableButton();
                                }
                            });

                        }
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
            });
          }
      }

      $scope.submitOrgPayment = function(info, token){

          //Call service.matchOrgType() to stream companyinfo to object
          var orgPayEsignOBJ = companyOnboardingModel.matchOrgType(info, token.id);

          //Call '/payment' to submit Stripe token with companyinfo
          ajax.create(dataFactory.payment().pay, orgPayEsignOBJ, function successCallback(response) {
            if (response.data.status == "succeeded"){
              storageService.remove('companyinfoCache');
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Great')
                  .content('Successful payment! Redirect to dashboard.')
                  .ok('OK')
              ).then(function(){
                // alert("Beta Test Version, should redirect in release version");
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
                .content('Oops, payment went wrong, please contact us.')
                .ok('OK')
            );
          }).then(function(){
              $scope.enableButton();
          });
      }

}])
