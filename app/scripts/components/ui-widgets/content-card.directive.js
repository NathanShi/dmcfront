'use strict';

angular.module('dmc.widgets.content', [
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ng-showdown'
]).directive('uiWidgetContent', ['$parse', function ($parse) {
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
    }
    
}]);
