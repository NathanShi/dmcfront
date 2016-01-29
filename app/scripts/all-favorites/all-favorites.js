'use strict';
angular.module('dmc.all-favorites', [
	'ngMdIcons',
	'ngAnimate',
	'ngMaterial',
	'ngCookies',
	'ngSanitize',
	'ui.sortable',
	'ui.router',
	'md.data.table',
	'dmc.configs.ngmaterial',
	'dmc.common.header',
	'dmc.common.footer',
	"dmc.ajax",
	"dmc.data",
	'dmc.component.treemenu',
	'dmc.component.productscard',
	'dmc.component.productcard',
	'dmc.component.carousel',
	'dmc.compare',
	'dmc.model.toast-model',
	'dmc.component.products-filter',
	'dmc.model.services',
	'flow',
	'ng-autofocus'
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
	$stateProvider.state('allFavorites', {
		url: '/',
		controller: 'AllFavoritesCtrl',
		templateUrl: 'templates/all-favorites/all-favorites.html',
		resolve: {
			allFavorites: ['ajax', 'dataFactory', 'toastModel', function(ajax, dataFactory, toastModel){
				return ajax.get(dataFactory.getFavoriteService(1), 
					{
						_expand: ["service", "component"]
					},
					function(response){
						var data = [];
						for (var i in response.data){
							if(response.data[i].service){
								data.push(response.data[i].service);
							}else if(response.data[i].component){
								data.push(response.data[i].component);
							}
							data[i].favorite = true;
						}
						return data;
					},
					function(response){
						toastModel.showToast("error", "Error." + response.statusText);
					}
					)
			}]
		}
	})
	.state('allFavoritesSearch', {
        url: '/search?product?type?authors?ratings?favorites?dates?text?mw',
		controller: 'AllFavoritesCtrl',
		templateUrl: 'templates/all-favorites/all-favorites.html'
        
    });
	$urlRouterProvider.otherwise('/');
})

.controller('AllFavoritesCtrl', [ '$scope', '$stateParams', '$state', '$location', 'menuFavorite', 'ajax', 'dataFactory', 'allFavorites', '$cookies',
					   function (  $scope,   $stateParams,   $state,   $location,   menuFavorite,   ajax,   dataFactory,   allFavorites,   $cookies) {
	$scope.treeMenuModel = menuFavorite.getMenu();
    $scope.selectedProductType = 'service';
	$scope.isSearch = ($location.$$path.indexOf('search') != -1 ? true : false);
	$scope.allFavorites = {
		arr: allFavorites, 
		count: allFavorites.length
	}
	$scope.currentStorefrontPage = 1;
    $scope.pageSize = 10;
    $scope.downloadData = false;

// get data from cookies
    var updateCompareCount = function () {
        var arr = $cookies.getObject('compareProducts');
        return arr == null ? {services: [], components: []} : arr;
    };
    $scope.compareProducts = updateCompareCount();

    // catch updated changedCompare variable form $cookies
    $scope.$watch(function () {
        return $cookies.changedCompare;
    }, function (newValue) {
        $scope.compareProducts = updateCompareCount();
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
    });

	$scope.productTypes = [
                {
                    id: 1,
                    name: "all",
                    title: "All"
                }, {
                    id: 2,
                    name: "services",
                    title: "Services"
                }, {
                    id: 3,
                    name: "components",
                    title: "Components"
                }
            ];

	// Function for product types drop down (all, services, components)
    $scope.productTypeChanged = function () {
        var dataSearch = $.extend(true,{},$stateParams);
        dataSearch.product = $scope.selectedProductType;
        $location.path('/').search(dataSearch);
    };

    $scope.updatePageSize = function (val) {
        $scope.pageSize = val;
        //$scope.update(true);
    };

	console.info("AllFavoritesCtrl");
}])
.service('menuFavorite', ['$location','$stateParams',function ($location,$stateParams) {
	this.getMenu = function(){
		var dataSearch = $.extend(true,{},$stateParams);

		var searchPage = ($location.$$path.indexOf("/edit") != -1 ? "edit" : "search");
		return {
			title: 'BROWSE BY',
			data: [
				{
					'id': 1,
					'title': 'All',
					'tag' : 'all',
					'items': 45,
					'opened' : (dataSearch.product == 'all' ? true : false),
					'onClick' : function(){
						console.info("dfd")
						dataSearch.product = 'all';
						$location.path('/search').search(dataSearch);
					},
					'categories': []
				},
				{
					'id': 2,
					'title': 'Components',
					'tag' : 'components',
					'items': 13,
					'opened' : (dataSearch.product == 'components' ? true : false),
					'onClick' : function(){
						dataSearch.product = 'components';
						$location.path('/search').search(dataSearch);
					},
					'categories': []
				},
				{
					'id': 3,
					'title': 'Services',
					'tag' : 'services',
					'items': 32,
					'opened' : (dataSearch.product == 'services' ? true : false),
					'onClick' : function(){
						dataSearch.product = 'services';
						$location.path('/search').search(dataSearch);
					},
					'categories': [
						{
							'id': 31,
							'title': 'Analytical Services',
							'tag' : 'analytical',
							'items': 15,
							'opened' : (dataSearch.product == 'services' && dataSearch.type == 'analytical' ? true : false),
							'onClick' : function(){
								dataSearch.product = 'services';
								dataSearch.type = 'analytical';
								$location.path('/search').search(dataSearch);
							},
							'categories': []
						},
						{
							'id': 32,
							'title': 'Solid Services',
							'tag' : 'solid',
							'items': 15,
							'opened' : (dataSearch.product == 'services' && dataSearch.type == 'solid' ? true : false),
							'onClick' : function(){
								dataSearch.product = 'services';
								dataSearch.type = 'solid';
								$location.path('/search').search(dataSearch);
							},
							'categories': []
						},
						{
							'id': 33,
							'title': 'Data Services',
							'tag' : 'data',
							'items': 2,
							'opened' : (dataSearch.product == 'services' && dataSearch.type == 'data' ? true : false),
							'onClick' : function(){
								dataSearch.product = 'services';
								dataSearch.type = 'data';
								$location.path('/search').search(dataSearch);
							},
							'categories': []
						}
					]
				}
			]
		};
	};
}]);