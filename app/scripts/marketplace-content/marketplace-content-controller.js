'use strict';

angular.module('dmc.marketplace-content')
    .controller("MarketplaceContentController",[
        "$scope",
        "$stateParams",
        "toastModel",
        function(
            $scope,
            $stateParams,
            toastModel) {

              $scope.categoryTitle = $stateParams.contentTitle;
              
        }
    ]
);
