'use strict';

angular.module('dmc.notifications', [
	'dmc.configs.ngmaterial',
	'ngMdIcons',
	'ui.router',
	'dmc.ajax',
	'dmc.data',
	'dmc.common.header',
	'dmc.common.footer',
  'dmc.common.notifications'
])
	.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
		$stateProvider.state('notifications-pm', {
			url: '/pm',
			templateUrl: 'templates/notifications/notifications.html',
			controller: 'notificationsPmController',
			resolve: {
				notificationsStatistic: ['notificationsModel', function(notificationsModel){
					return notificationsModel.get_notifications_pm_statistic();
				}]
			}
		})
		.state('notifications-user', {
			url: '/user',
			templateUrl: 'templates/notifications/notifications.html',
			controller: 'notificationsUserController',
			resolve: {
				notificationsStatistic: ['notificationsModel', function(notificationsModel){
					return notificationsModel.get_notifications_user_statistic();
				}]
			}
		});
		$urlRouterProvider.otherwise('/pm');
	})
	.service('notificationsModel', ['ajax', 'dataFactory', 'toastModel',
                            function (ajax, dataFactory, toastModel) {
        this.get_notifications_user = function(params, callback){
            return ajax.get(dataFactory.getNotificationsUser(),
                params,
                function(response){
                    callback(response.data);
                }
            )
        };

        this.get_notifications_user_statistic = function(callback, params){
            return ajax.get(dataFactory.getNotificationsStatisticUser(),
                {},
                function(response){
                    return response.data;
                }
            )
        };
        this.get_notifications_pm = function(params, callback){
            return ajax.get(dataFactory.getNotificationsPm(),
                params,
                function(response){
                    callback(response.data);
                }
            )
        };

        this.get_notifications_pm_statistic = function(callback, params){
            return ajax.get(dataFactory.getNotificationsStatisticPm(),
                {},
                function(response){
                    return response.data;
                }
            )
        };

				this.updateResponseShape = function(data){
					// for (var i=0; i<data.length; i++){
					// 	if (data[i].type=="DOCUMENT_SHARED") {
					// 		var notDetails = JSON.parse(data[i].message);
					// 		data[i].documentUrl = notDetails.documentUrl;
					// 		data[i].documentName = notDetails.documentName;
					// 		data[i].message = "A documen was shared with you."
					// 	}
					// }

					return data;
				}
    }]);
