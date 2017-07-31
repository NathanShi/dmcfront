'use strict';

angular.module('dmc.widgets.content', [
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ng-showdown',
    'ngYoutubeEmbed',
    'dmc.widgets.rich-text',
    'dmc.component.product-card-buttons'
]).directive('uiWidgetContent', ['$parse', 'dataFactory', function ($parse, dataFactory) {
    return {
        restrict: 'A',
        templateUrl: '/templates/components/ui-widgets/content-card.html',
        scope: true,
        bindToController: {
            contentType: '=',
            title: '=',
            category: '=',
            contentItems: '='
        },
        controller: UiWidgetContentCardController,
        controllerAs: '$ctrl'
    };
    
    /**
     * Controller for the uiWidgetContent directive.
     *
     * This directive contains 4 properties or objects:
     * contentType: String (required) - 'app', 'video', 'img', or 'document'
     * title: String (optional) - any string to be displayed
     * category: String (optional) - any string to be displayed
     * contentItems: Array of objects
     *
     * This directive can display 4 categories of content for the contentItems array:
     *
     * document - array of documents
     * video - [{
     *          videoSource: String (link to video)
     *          contentTitle: String (video title)
     *          description: String (description of video)
     *          buttonText: String (text to be displayed on button)
     *          buttonLink: String (link to new page)
     *         }]
     * img - [{
     *         imgSource: String (link to img)
     *         contentTitle: String (video title)
     *         description: String (description of video)
     *         buttonText: String (text to be displayed on button)
     *         buttonLink: String (link to new page)
     *       }]
     * app - array of apps/services
     *
     */
    function UiWidgetContentCardController($http) {
        var vm = this;
        
        vm.downloadFile = function(id) {
            window.location = dataFactory.documentsUrl(id).download;
        };
    }
    
}]);
