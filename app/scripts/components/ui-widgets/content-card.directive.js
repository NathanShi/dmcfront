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
            contentItem: '=',
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

        // $scope.$watch(function () {
        //     return vm.contentItem;
        // }, function (newValue, oldValue) {
        //     if (newValue !== oldValue) {
        //         vm.categorizedContent = categorizeContent(vm.contentItem);
        //     }
        // }, true);

        var categorizeContent = function(contentItem) {

            if (contentItem.documentName) {
                contentItem.contentType = 'document';
            } else if (contentItem.videoSource) {
                contentItem.contentType = 'video';
            } else if (contentItem.imgSource) {
                contentItem.contentType = 'img';
            } else if (contentItem.serviceType || contentItem.type === 'service') {
                contentItem.contentType = 'app';
            }
            return contentItem;
        };

        vm.categorizedContent = categorizeContent(vm.contentItem);

        vm.downloadFile = function(id) {
          console.log("download called")
            window.location = dataFactory.documentsUrl(id).download;
        };

        vm.goToIntegration = function ( path ) {
          window.location = path;
        };

        vm.contentImage = function(content) {
          // var imgLocation = "/images/Icons_Connect.svg"
          var imgLocation;
          //
          // // app
          // if (content.contentType === 'img') {
          //   imgLocation = content.imgSource
          // }
          // // also app :\
          // if (content.contentType === '') {
          //   imgLocation = content.featureImage.large
          // }
          // // hard-coded content image
          // if (content.contentImage) {
          //   imgLocation = content.contentImage
          // }

          switch(content.contentType) {
              case 'document':
                imgLocation = '';
                break;
              case 'video':
                imgLocation = '';
                break;
              case 'img':
                imgLocation = '';
                break;
              case 'app':
                imgLocation = '';
                break;
              default:
                imgLocation = "/images/Icons_Connect.svg"
          }
          return imgLocation
        }

        // vm.categorizedContent = categorizeContent(vm.contentItem);
        //
        // vm.downloadFile = function(id) {
        //     window.location = dataFactory.documentsUrl(id).download;
        // };

        vm.redirectToServiceHistory = function(projectId, serviceId) {
          $window.location.href = '/run-app.php#/'+projectId+'/services/'+serviceId+'/run/app-history';
        }

    }


}]);
