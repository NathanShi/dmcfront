'use strict';

angular.module('dmc.widgets.content', [
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ng-showdown',
    'ngYoutubeEmbed',
    'dmc.component.run-default-button'
]).directive('uiWidgetContent', ['$parse', 'dataFactory', function ($parse, dataFactory) {
    return {
        restrict: 'A',
        templateUrl: '/templates/components/ui-widgets/content-card.html',
        scope: true,
        bindToController: {
            title: '=',
            category: '=',
            contentItems: '=',
            serviceMap: '='
        },
        controller: UiWidgetContentCardController,
        controllerAs: '$ctrl'
    };

    /**
     * Controller for the uiWidgetContent directive.
     *
     * This directive contains 3 properties or objects:
     * title: String (optional) - any string to be displayed
     * category: String (optional) - any string to be displayed
     * contentItems: Array of objects
     *
     * This directive can display 4 categories of content for the contentItems array:
     *
     * document, video, img, app
     */
    function UiWidgetContentCardController($http, DMCUserModel, $window, ajax) {
        var vm = this;

        var categorizeContent = function(contentItems) {

            if (contentItems) {
                for (var i = 0; i < contentItems.length; i++) {
                    if (contentItems[i].documentName) {
                        contentItems[i].contentType = 'document';
                    } else if (contentItems[i].videoSource) {
                        contentItems[i].contentType = 'video';
                    } else if (contentItems[i].imgSource) {
                        contentItems[i].contentType = 'img';
                    } else if (contentItems[i].serviceType || contentItems[i].type === 'service') {
                        contentItems[i].contentType = 'app';
                    }
                }
            }
            return contentItems;
        };

        vm.categorizedContent = categorizeContent(vm.contentItems);

        vm.downloadFile = function(id) {
            window.location = dataFactory.documentsUrl(id).download;

        };

        vm.categorizedContent = categorizeContent(vm.contentItems);

        vm.downloadFile = function(id) {
            window.location = dataFactory.documentsUrl(id).download;
        };

        var redirectToService = function(tagsAdded, interfacesAdded, projectId, serviceId) {
          if (tagsAdded && interfacesAdded) {
            $window.location.href = '/run-app.php#/'+projectId+'/services/'+serviceId+'/run';
          }
        };

    }


}]);
