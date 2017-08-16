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
              // Get favorites
              ajax.get(dataFactory.getMyFavorites(1),{},function(response){
                  // Do stuff on response
                  $scope.myFavs = response.data;
              });

              $scope.addFav = function(product_id){
                // Post new favorite
                ajax.update(dataFactory.getMyFavorites(1),{"id": product_id},function(response){
                    // Do stuff on response

                });
              }
            }
        };
    }])
