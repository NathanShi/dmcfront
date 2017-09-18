
angular.module('dmc.myfavorites')
    .controller('myfavoritesCtrl', ['$scope', '$http', 'dataFactory', function ($scope, $http, dataFactory) {
        
        var favoriteAppIds= [];
        $scope.favoriteApps = [];
        $scope.serviceMap = [];
    
        getFavoriteApps();
        
        function getFavoriteApps() {
            $http.get(dataFactory.userFavorites(null, "1").get).then(function (response) {
                response.data.forEach(function (userFavorite) {
                    console.log(userFavorite);
                    favoriteAppIds.push(userFavorite.contentId);
                }, function (message) {
                    console.log(message);
                });
                
                $http.get(dataFactory.services(favoriteAppIds.toString()).get).then(function (response) {
                    console.log(response);
                    if (Array.isArray(response.data)) {
                        response.data.forEach(function (service) {
                            if(service.parent) {
                                $scope.serviceMap[service.parent] = {
                                    'serviceId': service.id,
                                    'workspaceId': service.projectId
                                };
                            }
                        });
                        $scope.favoriteApps = response.data;
                    } else {
                        if (response.data.parent) {
                            $scope.serviceMap[response.data.parent] = {
                                'serviceId': response.data.id,
                                'workspaceId': response.data.projectId
                            };
                        }
                        $scope.favoriteApps.push(response.data);
                    }
                });
            });
        }
        
    }]);
