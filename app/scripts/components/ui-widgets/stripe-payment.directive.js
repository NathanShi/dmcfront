'use strict';

angular.module('dmc.widgets.stripe-payment', [
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ng-showdown',
]).directive('uiWidgetStripePayment', ['$parse', 'dataFactory', function ($parse, dataFactory) {
    return {
        restrict: 'E',
        templateUrl: '/templates/components/ui-widgets/stripe-payment.html',
        scope: {
          returnFunction : '=',
        },
        controller: UiWidgetStripePaymentController,
        controllerAs: '$ctrl'
    };

    function UiWidgetStripePaymentController($scope, $http, DMCUserModel, $mdDialog, $window, ajax) {

      $scope.isDisabled = false;
      $scope.submitted = false;

      $scope.disableButton = function(){
        $scope.isDisabled = true;
        $scope.submitted = true;
      }

      $scope.enableButton = function(){
        $scope.isDisabled = false;
        $scope.submitted = false;
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

        console.log($scope.isDisabled, $scope.submitted);
        console.log('here 1');

        stripe.createToken(card).then(function(result) {
          $scope.$apply(function(){
            $scope.enableButton();
          });

          console.log('here 2');
          if (result.error) {
            console.log('here 3');
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            console.log('here 4', result.token);
            // Send the token to your server

            $scope.returnFunction(result.token);
          }
        });
      });

    }


}]);
