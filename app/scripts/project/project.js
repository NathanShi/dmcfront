'use strict';

angular.module('dmc.project', [
		'dmc.configs.ngmaterial',
		'ngMdIcons',
		'ngMaterial',
		'ngMessages',
		'ngMask',
		'dmc.ajax',
		'dmc.data',
		'ngtimeago',
		'dmc.widgets.services',
		'dmc.widgets.tasks',
		'dmc.widgets.discussions',
		'dmc.widgets.documents',
		'dmc.widgets.components',
		'dmc.widgets.questions',
		'dmc.widgets.submissions',
		'dmc.widgets.invited-users',
		'dmc.widgets.stars',
		'dmc.widgets.review',
		'dmc.widgets.tabs',
		'ui.router',
		'md.data.table',
		'ngCookies',
		'dmc.common.header',
		'dmc.common.footer',
		'dmc.model.project',
		'ui.autocomplete',
		'dmc.model.toast-model',
		'dmc.model.services',
		'dmc.sub-nav-menu'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
        var resolve = {
            projectData: ['DMCProjectModel', '$stateParams',
                function(DMCProjectModel, $stateParams) {
                    return DMCProjectModel.getModel($stateParams.projectId);
                }]
        };
        $stateProvider.state('project', {
            url: '/:projectId',
            controller: 'IdLocatorCtrl',
            template: '<ui-view />',
            resolve: resolve
        }).state('preview', {
            url: '/preview/:projectId',
            templateUrl: 'templates/project/pages/home.html',
            controller: 'DMCPreviewProjectController as projectCtrl',
            resolve: resolve
        }).state('blank_submission', {
            url: '/submission/blank/:projectId',
            templateUrl: 'templates/project/blank-submission.html',
            controller: 'DMCBlankSubmissionProjectController as projectCtrl',
            resolve: resolve
        }).state('submission', {
            url: '/submission/:projectId',
            templateUrl: 'templates/project/pages/home.html',
            controller: 'DMCSubmissionProjectController as projectCtrl',
            resolve: resolve
        }).state('submissions', {
            url: '/submissions/:projectId',
            templateUrl: 'templates/project/submissions.html',
            controller: 'DMCSubmissionsProjectController as projectCtrl',
            resolve: resolve
        }).state('project_rfp_blank', {
            url: '/rfp/blank/:projectId',
            templateUrl: 'templates/project/rfp-home-blank.html',
            controller: 'DMCRfpBlankHomeProjectController as projectCtrl',
            resolve: resolve
        }).state('project_rfp', {
            url: '/rfp/:projectId',
            templateUrl: 'templates/project/rfp-home.html',
            controller: 'DMCRfpHomeProjectController as projectCtrl',
            resolve: resolve
        }).state('submit', {
            url: '/submit/:projectId',
            templateUrl: 'templates/project/submit.html',
            controller: 'DMCSubmitProjectController as projectCtrl',
            resolve: resolve
        }).state('submitted', {
            url: '/submitted/:projectId',
            templateUrl: 'templates/project/submitted.html',
            controller: 'DMCSubmittedProjectController as projectCtrl',
            resolve: resolve
        }).state('project.home', {
            url: '/home',
            controller: 'HomeCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/home.html'
        }).state('project.workspace', {
            url: '/workspace',
            controller: 'WorkspaceCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/workspace.html'
        }).state('project.documents', {
            url: '/documents',
            controller: 'DocumentsCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/documents.html'
        }).state('project.tasks', {
            url: '/tasks?text?type',
            controller: 'TasksCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/tasks.html'
        }).state('project.team', {
            url: '/team',
            controller: 'TeamCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/team.html'
        }).state('project.discussions', {
            url: '/discussions?text?type',
            controller: 'DiscussionsCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/discussions.html'
        }).state('project.rfp-home', {
            url: '/rfp-home',
            controller: 'RfpHomeCtrl as projectCtrl',
            templateUrl: 'templates/project/rfp/home.html'
        }).state('project.rfp-submissions', {
            url: '/rfp-submissions',
            controller: 'RfpSubmissionsCtrl as projectCtrl',
            templateUrl: 'templates/project/rfp/submissions.html'
        }).state('project.rfp-documents', {
            url: '/rfp-documents',
            controller: 'RfpDocumentsCtrl as projectCtrl',
            templateUrl: 'templates/project/rfp/documents.html'
        }).state('project.rfp-questions', {
            url: '/rfp-questions',
            controller: 'RfpQuestionsCtrl as projectCtrl',
            templateUrl: 'templates/project/rfp/questions.html'
        }).state('project.rfp-people-invited', {
            url: '/rfp-people-invited',
            controller: 'RfpPeopleInvitedCtrl as projectCtrl',
            templateUrl: 'templates/project/rfp/people-invited.html'
        }).state('project.services', {
            url: '/services',
            controller: 'projectServicesCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/services.html'
        }).state('project.upload-services', {
            url: '/upload-service',
            controller: 'projectUploadServicesCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/upload-service.html',
            resolve:{
                edit: function(){
                    return false
                }
            }
        }).state('project.edit-services', {
            url: '/edit-service',
            controller: 'projectUploadServicesCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/upload-service.html',
            resolve:{
                edit: function(){
                    return true
                }
            }
        }).state('project.run-services', {
            url: '/run-service/:ServiceId',
            controller: 'projectRunServicesCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/run-service.html'
        }).state('project.services-detail', {
            url: '/services/:ServiceId/detail',
            controller: 'projectServicesDetailCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/services-detail.html',
            resolve: {
	            serviceData: ['serviceModel', '$stateParams', function (serviceModel, $stateParams) {
	                return serviceModel.get_service($stateParams.ServiceId);
	            }]
	        }
        }).state('project.publish-service-marketplace', {
            url: '/services/:ServiceId/publish',
            controller: 'PublishServiceMarketplaceCtrl as projectCtrl',
            templateUrl: 'templates/project/pages/publish-service-marketplace.html',
            resolve: {
                serviceData: ['serviceModel', '$stateParams', function (serviceModel, $stateParams) {
                    return serviceModel.get_service($stateParams.ServiceId);
                }]
            }
        });
        $urlRouterProvider.otherwise('/1');
})
	.controller('DMCPreviewProjectController', ['$scope','$stateParams', 'projectData', function ($scope, $stateParams, projectData) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;

		$scope.isPreview = true;
	}])
	.controller('DMCBlankSubmissionProjectController', ['$scope','$stateParams', 'projectData', function ($scope, $stateParams, projectData) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;

		$scope.isSubmission = true;
		$scope.isBlankSubmission = true;
	}])
	.controller('DMCSubmissionProjectController', ['$scope','$stateParams', 'projectData', function ($scope, $stateParams, projectData) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;

		$scope.isSubmission = true;
	}])
	.directive('submissionInputsOutputs', function () {
		return {
			restrict: 'A',
			templateUrl: 'templates/project/inputs-outputs-tpl.html',
			scope : {
				submissionName: '=',
				totalInputs: '=',
				submissionLetter: '='
			},
			controller: function ($scope) {
				$scope.inputs = new Array($scope.totalInputs);
			}
		}
	})
	.controller('DMCRfpBlankHomeProjectController', ['$scope','$stateParams', 'projectData','ajax','dataFactory','$compile', function ($scope, $stateParams, projectData,ajax,dataFactory,$compile) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;
	}])
	.controller('DMCRfpHomeProjectController', ['$scope','$stateParams', 'projectData','ajax','dataFactory','$compile', function ($scope, $stateParams, projectData,ajax,dataFactory,$compile) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;
	}])
	.controller('DMCSubmittedProjectController', ['$cookies','$scope','$stateParams','projectData', function ($cookies,$scope, $stateParams,projectData) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;

		$scope.submittedItems = $cookies.getObject('submittedItems');
		$scope.inputs = ($scope.submittedItems && $scope.submittedItems.service ? new Array($scope.submittedItems.service.specificationsData.input) : []);
		$scope.outputs = ($scope.submittedItems && $scope.submittedItems.service ? new Array($scope.submittedItems.service.specificationsData.output) : []);
	}])
	.controller('DMCSubmitProjectController', ['$location','$cookies','$scope','$stateParams', 'projectData','ajax','dataFactory','$compile', function ($location,$cookies,$scope, $stateParams, projectData,ajax,dataFactory,$compile) {
		var projectCtrl = this;
		projectCtrl.currentProjectId = angular.isDefined($stateParams.projectId) ? $stateParams.projectId : 1;
		projectCtrl.projectData = projectData;
		$scope.services = [];
		var sort = 'status';
		var order = 'DESC';
		$scope.latter = 'We propose to develop and deliver a low heat loss Transformer based on our novel material. It will meet all of the environmental and Compliance requirements in your specification. The attached document summarizes Performance relative to an iron core transformer. Please let us know how you would like to proceed.';
		$scope.submitProject = function(){
			var selectedService = null;
			for(var i in $scope.services) {
				if($scope.services[i].select){
					selectedService = $scope.services[i];
					break;
				}
			}
			if(selectedService && $scope.latter.trim().length > 0) {
				var submittedItems = {
					service : selectedService,
					latter : $scope.latter
				};
				$cookies.putObject('submittedItems', submittedItems);
				$location.url('/submitted/'+projectCtrl.currentProjectId);
			}
		};
		var getServices = function() {
			$scope.services = [
				{
					"id": 1,
					"title": 'Run #1',
					"releaseDate": "01-04-2015",
					"currentStatus": {
					  "percentCompleted": "33"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				},
				{
					"id": 2,
					"title": 'Run #2',
					"releaseDate": "10-04-2015",
					"currentStatus": {
					  "percentCompleted": "66"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				},
				{
					"id": 3,
					"title": 'Run #3',
					"releaseDate": "12-04-2015",
					"currentStatus": {
					  "percentCompleted": "78"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				},
				{
					"id": 4,
					"title": 'Run #4',
					"releaseDate": "06-05-2015",
					"currentStatus": {
					  "percentCompleted": "77"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				},
				{
					"id": 5,
					"title": 'Run #5',
					"releaseDate": "08-05-2015",
					"currentStatus": {
					  "percentCompleted": "65"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				},
				{
					"id": 6,
					"title": 'Run #6',
					"releaseDate": "10-05-2015",
					"currentStatus": {
					  "percentCompleted": "43"
					},
					"specificationsData": {
						"serviceId": 25,
						"description": "Estimates Mu for materials with simple structures and known saturation polarization",
						"input": 2,
						"output": 1,
						"usageStats": {
						  "added": 130,
						  "members": 20
						},
						"runStats": {
						  "success": 108,
						  "fail": 12
						}
					  }
				}
			]
		};
		getServices();

		$(".submitServices").on("click",".table-line",function(ev){
			var tr = $(this);
			var item = null;
			var id = parseInt($(this).find(".idItem").val());
			for(var i in $scope.services){
				if($scope.services[i].id == id){
					$scope.services[i].select = true;
					item = $scope.services[i];
					break;
				}
			}
			for(var i in $scope.services){
				if($scope.services[i].select && $scope.services[i].id !== item.id) $scope.services[i].select = false;
			}
			tr.parents(".tableServices").find(".opened").removeClass('opened');
			$("#inputs-outputs").remove();
			$scope.isSelect = false;
			if(item.select) {
				$scope.isSelect = true;
				tr.addClass('opened');
				$($compile('<tr id="inputs-outputs" inputs-outputs total-outputs="'+item.specificationsData.output+'" total-inputs="'+item.specificationsData.input+'" service-name="\'' + item.title + '\'"></tr>')($scope)).insertAfter(tr);
			}
		});

		$scope.isSelect = false;
		$scope.selectModel = function(ev,item,select){
			for(var i in $scope.services){
				if($scope.services[i].select && $scope.services[i].id !== item.id) $scope.services[i].select = false;
			}
			$(ev.target).parents(".tableServices").find(".opened").removeClass('opened');
			$("#inputs-outputs").remove();
			$scope.isSelect = false;
			if(!select) {
				$scope.isSelect = true;
				var tr = $(ev.target).parents(".table-line");
				tr.addClass('opened');
				$($compile('<tr id="inputs-outputs" inputs-outputs total-outputs="'+item.specificationsData.output+'" total-inputs="'+item.specificationsData.input+'" service-name="\'' + item.title + '\'"></tr>')($scope)).insertAfter(tr);
			}
		};
		$scope.onOrderChange = function(){

		};
	}])
	.directive('inputsOutputs', function () {
		return {
			restrict: 'A',
			templateUrl: 'templates/components/rfp-invite/inputs-outputs-tpl.html',
			scope : {
				serviceName: '=',
				totalInputs: '=',
				totalOutputs: '='
			},
			controller: function ($scope) {
				$scope.inputs = new Array($scope.totalInputs);
				$scope.outputs = new Array($scope.totalOutputs);
			}
		}
	})
    .service('serviceModel', [
        'ajax',
        'dataFactory',
        '$stateParams',
        'toastModel',
        function (ajax,
                  dataFactory,
                  $stateParams,
                  toastModel) {
            this.get_service = function(id){
                return ajax.get(dataFactory.services(id).get, {
                        "_embed": ["specifications","service_authors", "service_input_output", "service_tags", "services_statistic"]
                    },
                    function(response){
                        var service = response.data;
                        return ajax.get(dataFactory.services(id).reviews, {},
                            function(response){
                                service["service_reviews"] = response.data;
                                service.rating = service.service_reviews.map(function(value, index){
                                    return value.rating;
                                });
                                service.number_of_comments = service.service_reviews.length;

                                if(service.number_of_comments != 0) {
                                    service.precentage_stars = [0, 0, 0, 0, 0];
                                    service.average_rating = 0;
                                    for (var i in service.rating) {
                                        service.precentage_stars[service.rating[i] - 1] += 100 / service.number_of_comments;
                                        service.average_rating += service.rating[i];
                                    }
                                    service.average_rating = (service.average_rating / service.number_of_comments).toFixed(1);

                                    for (var i in service.precentage_stars) {
                                        service.precentage_stars[i] = Math.round(service.precentage_stars[i]);
                                    }
                                }
                                for(var i in service["service_reviews"]){
                                    service["service_reviews"][i]['replyReviews'] = [];
                                }
                                return service;
                            },
                            function(response){
                                toastModel.showToast("error", "Error." + response.statusText);
                            }
                        )
                    }
                )
            };

            this.get_all_service = function(params, callback){
                return ajax.get(dataFactory.services($stateParams.ServiceId).all, params,
                    function(response){
                        callback(response.data);
                    }
                )
            };

            this.get_service_reviews = function(params, callback){
                return ajax.get(dataFactory.services($stateParams.ServiceId).reviews,
                    params,
                    function(response){
                        callback(response.data)
                    }
                )
            };

            this.add_service_reviews = function(params, callback){
                ajax.get(dataFactory.services($stateParams.ServiceId).addReviews,
                    {
                        "_limit" : 1,
                        "_order" : "DESC",
                        "_sort" : "id"
                    },
                    function(response){
                        var lastId = (response.data.length == 0 ? 1 : parseInt(response.data[0].id)+1);
                        params["id"] = lastId;
                        params["productId"] = $stateParams.ServiceId;
                        params["productType"] = "service";
                        params["reply"] = false;
                        params["reviewId"] = 0;
                        params["status"] = true;
                        params["date"] = moment().format('MM/DD/YYYY');
                        params["userRatingReview"] = {
                            "DMC Member": "none"
                        };
                        params["like"] = 0;
                        params["dislike"] = 0;

                        return ajax.create(dataFactory.services($stateParams.ServiceId).addReviews,
                            params,
                            function(response){
                                toastModel.showToast("success", "Review added");
                                if(callback) callback(response.data)
                            },
                            function(response){
                                toastModel.showToast("error", "Error." + response.statusText);
                            }
                        )
                    }
                )
            };

            this.edit_service = function(params, callback){
                ajax.get(dataFactory.services($stateParams.ServiceId).get,
                    {},
                    function(response){
                        console.info(response.data);
                        var component = response.data;
                        component['title'] = params['title'];
                        component['tags'] = params['tags'];
                        component['description'] = params['description'];

                        return ajax.update(dataFactory.services($stateParams.ServiceId).update,
                            component,
                            function(response){
                                callback(response.data)
                            },
                            function(response){
                                toastModel.showToast("error", "Error." + response.statusText);
                            }
                        )
                    }
                )
            };

            this.add_services_authors = function(array){
                ajax.get(dataFactory.services($stateParams.ServiceId).get_authors,
                    {
                        "_limit" : 1,
                        "_order" : "DESC",
                        "_sort" : "id"
                    },
                    function(response){
                        var lastId = (response.data.length == 0 ? 1 : parseInt(response.data[0].id)+1);
                        for(var i in array){
                            ajax.create(dataFactory.services($stateParams.ServiceId).add_authors,
                                {
                                    "id": lastId,
                                    "includeTo": $stateParams.ServiceId,
                                    "serviceId": array[i]
                                },
                                function(response){
                                },
                                function(response){
                                    toastModel.showToast("error", "Error." + response.statusText);
                                }
                            )
                            lastId++;
                        }
                    }
                )
            };

            this.remove_services_authors = function(array){
                for(var i in array){
                    ajax.delete(dataFactory.services(array[i]).remove_authors, {},
                        function(response){}
                    )
                }
            };

            this.add_services_tags = function(array){
                ajax.get(dataFactory.services($stateParams.ServiceId).get_tags,
                    {
                        "_limit" : 1,
                        "_order" : "DESC",
                        "_sort" : "id"
                    },
                    function(response){
                        var lastId = (response.data.length == 0 ? 1 : parseInt(response.data[0].id)+1);
                        for(var i in array){
                            ajax.create(dataFactory.services($stateParams.ServiceId).add_tags,
                                {
                                    "id": lastId,
                                    "serviceId": $stateParams.ServiceId,
                                    "name": array[i]
                                },
                                function(response){}
                            );
                            lastId++;
                        }
                    }
                )
            };

            this.remove_services_tags = function(array){
                for(var i in array){
                    ajax.delete(dataFactory.services(array[i]).remove_tags, {},
                        function(response){}
                    )
                }
            };

            this.get_service_hystory = function(params, callback){
                return ajax.get(dataFactory.services($stateParams.ServiceId).get_history,
                    params,
                    function(response){
                        callback(response.data)
                    }
                )
            };

    	    }
        ]
    );

