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
    
    function UiWidgetContentCardController($http) {
        var vm = this;
        
        console.log(vm.contentItems);
        
        vm.downloadFile = function(id) {
            window.location = dataFactory.documentsUrl(id).download;
        };
    }
    
}]);
