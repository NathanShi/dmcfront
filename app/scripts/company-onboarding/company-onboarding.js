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
    'google.places'
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
            .state('co-onboarding.home', {
                url: '/home',
                templateUrl: 'templates/company-onboarding/home.html',
                controller: 'co-homeController'
            })
        $urlRouterProvider.otherwise('/home');
    })
    .service('companyOnboardingModel', ['ajax', 'dataFactory', '$stateParams', 'toastModel', 'DMCUserModel',
         function (ajax, dataFactory, $stateParams, toastModel, DMCUserModel) {

            this.get_account = function(accountId, callback){
                return ajax.get(
                    dataFactory.getAccount(accountId),
                    {},
                    function(response){
                        callback(response.data);
                    }
                );
            }

            this.update_account = function(accountId, params, callback){
                ajax.get(
                    dataFactory.getAccount(accountId),
                    {},
                    function(response){
                        var account = response.data;
                        for(var item in params){
                           account.privacy[item] = params[item];
                        }
                        ajax.update(
                            dataFactory.updateAccount(accountId),
                            account,
                            function(response){
                                callback(response.data);
                            }
                        );
                    }
                );
            }

            this.update_notfications = function(notificationId, selected, callback){
                ajax.update(
                    dataFactory.updateUserAccountNotification(notificationId),
                    {
                        'selected': selected
                    },
                    function(response){
                        callback(response.data);
                    }
                );
            }

            this.get_servers = function(accountId, callback){
                ajax.get(dataFactory.getAccountServersUrl(accountId),
                    {},
                    function (response) {
                        callback(response.data);
                    }
                );
            };
    }])

    .directive('signupTabs', function () {
        return {
            restrict: 'E',
            controller: 'uiWidgetCompanyOnboardingTabs',
            templateUrl: 'templates/components/ui-widgets/company-onboarding-tab.html',
        };
    })
