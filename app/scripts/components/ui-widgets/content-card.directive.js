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
        };
        
    }


}]);
