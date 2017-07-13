'use strict';

angular.module('dmc.company.onboarding', [
    'dmc.configs.ngmaterial',
    'ngMdIcons',
    // 'ngtimeago',
    'ui.router',
    'dmc.widgets.companyonboardingTabs',
    // 'md.data.table',
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    // 'dmc.widgets.stars',
    // 'dmc.widgets.documents',
    // 'dmc.widgets.review',
    'dmc.model.question-toast-model',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.location',
    'dmc.model.toast-model',
    // 'dmc.model.fileUpload',
    'dmc.model.profile',
    'dmc.model.user',
    // 'dmc.phone-format',
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
            .state('co-onboarding.pay', {
                url: '/pay',
                templateUrl: 'templates/company-onboarding/pay.html',
                controller: 'co-payController'
            })
        $urlRouterProvider.otherwise('/companyinfo');
    })
    .service('companyOnboardingModel', ['ajax', 'dataFactory', '$stateParams', 'toastModel', 'DMCUserModel',
         function (ajax, dataFactory, $stateParams, toastModel, DMCUserModel) {

            var company = {};

            this.save_companyInfo = function(companyinfo){
                company = angular.copy(companyinfo);
                // console.log(company);
            }

            this.get_companyInfo = function(){
                return company;
            }
    }])
