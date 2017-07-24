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
    "dmc.utilities",
    'dmc.widgets.content'
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
    
    $scope.estimateContentItems = [{
        contentTitle: 'ANA',
        description: 'Etiam non  sem suscipit, pulvinar est non, luctus magna. Proin a placerat enim, eu porta velit.' +
            ' Sed placerat pallentesque lorem, vitae volupat orci suscipit eu. Praesent sceleerisque leo' +
            ' vehicula, pulvinar arcu quis, tincidunt quam.',
        buttonText: 'LAUNCH APP'
    }]
   
});