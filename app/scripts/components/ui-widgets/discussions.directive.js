'use strict';

angular.module('dmc.widgets.discussions',[
        'dmc.ajax',
        'dmc.data',
        'dmc.model.discussion',
        'ngSanitize',
        'dmc.socket'
    ]).
    directive('uiWidgetDiscussions', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            templateUrl: 'templates/components/ui-widgets/discussions.html',
            scope: {
                widgetTitle: "=",
                projectId: "="
            },
            link: function (scope, iElement, iAttrs) {

            },
            controller: function($scope, $element, $attrs, $mdDialog, socketFactory, dataFactory, ajax) {
                $scope.discussions = [];
                $scope.total = 0;
                // function for get all discussions from DB
                $scope.getDiscussions = function(){
                    ajax.on(dataFactory.getUrlAllDiscussions($scope.projectId),
                        dataFactory.get_request_obj({
                        projectId : $scope.projectId,
                        sort : 'created_at',
                        order : 'DESC',
                        limit : 4,
                        offset: 0
                    }),function(data){
                        var data = dataFactory.get_result(data);
                        $scope.discussions = data.result;
                        $scope.total = data.count;
                        for(var index in $scope.discussions){
                            $scope.discussions[index].created_at = moment($scope.discussions[index].created_at,'DD-MM-YYYY HH:mm:ss').format("MM/DD/YY hh:mm A");
                        }
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
                    },function(){
                        alert("Ajax faild: getDiscussions");
                    });
                };

                // get all discussions (first request)
                $scope.getDiscussions();

                // Socket listeners -------------------------------------------------

                // get updated discussions
                //socketFactory.on(socketFactory.updated().discussions, function(item){
                //    $scope.getDiscussions();
                //});

                $scope.newDiscussion = function(ev){
                    $mdDialog.show({
                        controller: "CreateDiscussionController",
                        templateUrl: 'templates/components/dialogs/create-discussion-tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        locals : {
                            projectId : $scope.projectId
                        }
                    }).then(function (answer) {

                    }, function (update) {
                        if(update) $scope.getDiscussions();
                    });
                };
            }
        };
    }]).
    directive('uiProjectDiscussions', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            templateUrl: 'templates/components/ui-widgets/project-discussions.html',
            scope:{
                projectId: "=",
                widgetTitle: "=",
                withAvatar: "=",
                totalItems: "=",
                widgetFormat: "="
            },
            link: function (scope, iElement, iAttrs) {
            },
            controller: function($scope, $element, $attrs, socketFactory, dataFactory, ajax) {
                $scope.projectDiscussions = [];
                $scope.sort = 'created_at';
                $scope.order = 'DESC';

                $scope.totalCount = 0;

                $scope.getProjectDiscussions = function(){
                    ajax.on(dataFactory.getUrlAllDiscussions($scope.projectId),
                        dataFactory.get_request_obj({
                        projectId: $scope.projectId,
                        sort : $scope.sort,
                        order : $scope.order,
                        limit : 3,
                        offset: 0
                    }),function(data){
                        var data = dataFactory.get_result(data);
                        $scope.projectDiscussions = data.result;
                        for(var index in $scope.projectDiscussions){
                            $scope.projectDiscussions[index].created_at = moment($scope.projectDiscussions[index].created_at,'DD-MM-YYYY HH:mm:ss').format("MM/DD/YY hh:mm A");
                        }
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
                    },function(){
                        alert("Ajax faild: getProjectDiscussions");
                    });
                };

                $scope.getProjectDiscussions();

                //socketFactory.on(socketFactory.updated().discussions, function(item){
                //    $scope.getProjectDiscussions();
                //});
            }
        };
    }]).controller('CreateDiscussionController',function($scope,$mdDialog,projectId,ajax,dataFactory, DMCDiscussionModel){
        $scope.isCreation = false;
        $scope.message = {
            error : false
        };
        $scope.cancel = function() {
            $mdDialog.cancel(false);
        };

        $scope.createDiscussion = function(){
            $scope.isCreation = true;
            $scope.message.error = false;
            DMCDiscussionModel.createDiscussion(
                {
                    "projectId": projectId,
                    "text": $scope.content,
                    "subject": $scope.subject,
                    "created_at": moment($scope.dueDate).format('DD-MM-YYYY HH:mm:ss')
                }
            ).then(
                function(data){
                    $scope.isCreation = false;
                    if(data.error == null) {
                        $mdDialog.cancel(true);
                    }else{
                        $scope.message.error = true;
                        console.error(data.error);
                    }
                    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
                },function(){
                    $scope.message.error = true;
                    alert("Ajax faild: createDiscussion");
                    $scope.isCreation = false;
                }
            )
            // ajax.on(dataFactory.getUrlCreateDiscussion(projectId),{
            //     projectId: projectId,
            //     subject : $scope.subject,
            //     text : $scope.content
            // },function(data){
            //     $scope.isCreation = false;
            //     if(data.error == null) {
            //         $mdDialog.cancel(true);
            //     }else{
            //         $scope.message.error = true;
            //         console.error(data.error);
            //     }
            //     if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
            // },function(){
            //     $scope.message.error = true;
            //     alert("Ajax faild: createDiscussion");
            //     $scope.isCreation = false;
            // }, 'POST');
        };
    });