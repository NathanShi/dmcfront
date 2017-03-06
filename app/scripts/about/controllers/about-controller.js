'use strict';

angular.module('dmc.about')
    .controller('AboutController', ['$stateParams', '$state', "$scope", "ajax", "$location","dataFactory","toastModel","Lightbox", function ($stateParams, $state, $scope, ajax, $location, dataFactory, toastModel,Lightbox) {

      $scope.openLightboxModal=function(img){
        Lightbox.openModal([{'url':img}],0);
      }

    }]
);
