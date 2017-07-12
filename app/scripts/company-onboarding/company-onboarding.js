'use strict';

angular.module('dmc.company.onboarding', [
    'dmc.configs.ngmaterial',
    'ngMdIcons',
    'ngtimeago',
    'ui.router',
    'dmc.widgets.companyonboardingTabs',
    'md.data.table',
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'dmc.widgets.stars',
    'dmc.widgets.documents',
    'dmc.widgets.review',
    'dmc.model.question-toast-model',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.location',
    'dmc.model.toast-model',
    'dmc.model.fileUpload',
    'dmc.model.profile',
    'dmc.model.user',
    'dmc.phone-format',
    'ngMaterial',
    'ngMessages',
    'google.places',
    'ngCookies'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('co-onboarding',{
                url: '',
                abstract: true,
                template: '<ui-view></ui-view>',
                controller: 'co-onboardingController',
                resolve: {
                    userData: ['DMCUserModel',
                        function(DMCUserModel) {
                            return DMCUserModel.getUserData();
                        }]
                }
            })
            .state('co-onboarding.companyinfo', {
                url: '/companyinfo',
                templateUrl: 'templates/company-onboarding/companyinfo.html',
                controller: 'co-companyinfoController'
            })
            .state('co-onboarding.createuser', {
                url: '/createuser',
                templateUrl: 'templates/company-onboarding/createuser.html',
                controller: 'co-homeController'
            })
            .state('co-onboarding.pay', {
                url: '/pay',
                templateUrl: 'templates/company-onboarding/pay.html',
                controller: 'co-payController'
            })
        $urlRouterProvider.otherwise('/createuser');
    })
    .service('companyOnboardingModel', ['ajax', 'dataFactory', '$stateParams', 'toastModel', 'DMCUserModel',
         function (ajax, dataFactory, $stateParams, toastModel, DMCUserModel) {

            var company = {};

            this.save_companyInfo = function(companyinfo){
                company = angular.copy(companyinfo);
                console.log(company);
            }

            this.get_companyInfo = function(){
                return company;
            }

            // this.update_account = function(accountId, params, callback){
            //     ajax.get(
            //         dataFactory.getAccount(accountId),
            //         {},
            //         function(response){
            //             var account = response.data;
            //             for(var item in params){
            //                account.privacy[item] = params[item];
            //             }
            //             ajax.update(
            //                 dataFactory.updateAccount(accountId),
            //                 account,
            //                 function(response){
            //                     callback(response.data);
            //                 }
            //             );
            //         }
            //     );
            // }
            //
            // this.update_notfications = function(notificationId, selected, callback){
            //     ajax.update(
            //         dataFactory.updateUserAccountNotification(notificationId),
            //         {
            //             'selected': selected
            //         },
            //         function(response){
            //             callback(response.data);
            //         }
            //     );
            // }
            //
            // this.get_servers = function(accountId, callback){
            //     ajax.get(dataFactory.getAccountServersUrl(accountId),
            //         {},
            //         function (response) {
            //             callback(response.data);
            //         }
            //     );
            // };
    }])
    .controller('TermsConditionsController',
    	['$scope', '$mdDialog','$window', "toastModel", 'ajax', 'dataFactory',
    	function ($scope, $mdDialog, $window, toastModel, ajax, dataFactory) {
      	$scope.enter = function(){
          ajax.create(dataFactory.getUserAcceptTermsAndConditionsUrl(), {},
            function() {
              $mdDialog.hide();
            },
            function() {
              toastModel.showToast("error", "Error updating information.");
            }
          )
        };
    }]);
