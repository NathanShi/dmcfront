'use strict';

angular.module('dmc.widgets.favButton',[
        'dmc.ajax',
        'dmc.data',
        'dmc.socket',
        'dmc.model.previous-page'
    ]).
    directive('uiWidgetFavButton', ['$parse', function ($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/components/ui-widgets/fav-button.html',

            controller: function($scope, $element, $attrs, socketFactory, dataFactory, ajax, toastModel, previousPage, $interval) {
              $scope.addFav = function(){
                
              }
            }
        };
    }])
