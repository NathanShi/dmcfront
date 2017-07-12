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

      //== Stripe ==
      // Create a Stripe client
      var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
    }

}])
