'use strict';

angular.module('dmc.widgets.content', [
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'ng-showdown',
    'ngYoutubeEmbed'
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
    function UiWidgetContentCardController($http, DMCUserModel, $window, ajax) {
        var vm = this;

        vm.downloadFile = function(id) {
            window.location = dataFactory.documentsUrl(id).download;
        };

        vm.saveToDefaultProject = function(app){

          var updatedItem = $.extend(true, {}, app);
          if (updatedItem.hasOwnProperty('$$hashKey')) {
            delete updatedItem['$$hashKey'];
          }
          var tagsAdded = false;
          var interfacesAdded = false;

          // updatedItem.owner = userData.accountId;
          updatedItem.from = 'marketplace';
          updatedItem.published = false;
          updatedItem.parent = updatedItem.id;
          delete updatedItem.projectId
          delete updatedItem.tags;

          ajax.create(dataFactory.services().add, updatedItem, function (response) {
            var id = response.data.id;
            var projectId = response.data.projectId;

            ajax.get(dataFactory.services(app.id).get_tags, {}, function(response) {
              angular.forEach(response.data, function(tag) {
                delete tag.id;
                tag.serviceId = id;
                ajax.create(dataFactory.services(id).add_tags, tag);
              });
              tagsAdded = true;
              redirectToService(tagsAdded, interfacesAdded, projectId, id);
            });
            ajax.get(dataFactory.services(app.id).get_interface, {}, function(response) {
              angular.forEach(response.data, function(newDomeInterface) {
                delete newDomeInterface.id;
                newDomeInterface.serviceId = id;
                ajax.create(dataFactory.services().add_interface, newDomeInterface);
              });
              interfacesAdded = true;
              redirectToService(tagsAdded, interfacesAdded, projectId, id);
            });
          });
        };

        var redirectToService = function(tagsAdded, interfacesAdded, projectId, serviceId) {
          if (tagsAdded && interfacesAdded) {
            $window.location.href = '/run-app.php#/'+projectId+'/services/'+serviceId+'/run';
          }
        }
    }


}]);
