'use strict';
angular.module('dmc.transform', [
    'ngMdIcons',
    'ngAnimate',
    'ngMaterial',
    'ngSanitize',
    'ui.router',
    'md.data.table',
    'dmc.configs.ngmaterial',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.model.toast-model',
    "dmc.ajax",
    "dmc.data",
    "dmc.utilities"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('transform', {
        template: '<ui-view />'
    }).state('transform.home', {
        url: '/',
        controller: 'TransformController',
        templateUrl: 'templates/transform/transform.html'
    });
    $urlRouterProvider.otherwise('/');
}).controller('TransformController', function ($scope, $element, $location, scrollService) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);
    
        // call scrollTo
        scrollService.scrollTo(eID);
    };
    
    
   // function scrollTo(eID) {
   //
   //      var startY = currentYPosition();
   //      var stopY = elmYPosition(eID) - 150;
   //      var distance = stopY > startY ? stopY - startY : startY - stopY;
   //
   //      if (distance < 100) {
   //          scrollTo(0, stopY); return;
   //      }
   //      var speed = Math.round(distance / 100);
   //      if (speed >= 20) speed = 20;
   //      var step = Math.round(distance / 25);
   //      var leapY = stopY > startY ? startY + step : startY - step;
   //      var timer = 0;
   //      if (stopY > startY) {
   //          for ( var i=startY; i<stopY; i+=step ) {
   //              setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
   //              leapY += step; if (leapY > stopY) leapY = stopY; timer++;
   //          } return;
   //      }
   //      for ( var i=startY; i>stopY; i-=step ) {
   //          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
   //          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
   //      }
   //
   //      function currentYPosition() {
   //          // Firefox, Chrome, Opera, Safari
   //          if (self.pageYOffset) return self.pageYOffset;
   //          // Internet Explorer 6 - standards mode
   //          if (document.documentElement && document.documentElement.scrollTop)
   //              return document.documentElement.scrollTop;
   //          // Internet Explorer 6, 7 and 8
   //          if (document.body.scrollTop) return document.body.scrollTop;
   //          return 0;
   //      }
   //
   //      function elmYPosition(eID) {
   //          var elm = document.getElementById(eID);
   //          var y = elm.offsetTop;
   //          var node = elm;
   //          while (node.offsetParent && node.offsetParent != document.body) {
   //              node = node.offsetParent;
   //              y += node.offsetTop;
   //          } return y;
   //      }
   //
   //  };
   
});