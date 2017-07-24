'use strict';
angular.module('dmc.marketplace', [
    'ngMdIcons',
    'ngAnimate',
    'ngMaterial',
    'ngSanitize',
    'ui.router',
    'md.data.table',
    'dmc.configs.ngmaterial',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.model.toast-model',
    "dmc.ajax",
    "dmc.data",
    "dmc.utilities"
]).config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider.state('marketplace', {
        template: '<ui-view />'
    }).state('marketplace.home', {
        url: '/',
        controller: 'marketplaceController',
        templateUrl: 'templates/marketplace/marketplace.html'
    });
    $urlRouterProvider.otherwise('/');
}).controller('marketplaceController', function ($scope, $element, $location, scrollService) {
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call scrollTo
        scrollService.scrollTo(eID);
    };

    $scope.mockContent = [
      {
        title: "Venenatis justo vulputate placerat",
        icon: "images/calc.png",
        description: "Vestibulum tincidunt sem at bibendum mollis. Integer nulla felis, volutpat semper tortor eget, luctus vulputate ligula. Nunc ac urna vehicula leo consequat tincidunt. Duis tincidunt porta massa, vitae cursus ex feugiat ac. Donec suscipit id risus vel mattis. Sed lobortis velit in ligula ullamcorper, in consectetur nisl sagittis. Proin metus eros, aliquam in tellus placerat, vulputate tincidunt felis. "
      },
      {
        title: "Nibh ipsum et montes ligula",
        icon: "images/ruler.png",
        description: "Congue diam quis ut, tristique fermentum nunc id lorem, pellentesque scelerisque. Risus non tellus, vivamus nunc felis nec, lorem consequat, condimentum ut libero posuere ullamcorper mauris, eget luctus. Potenti libero eu purus urna pharetra wisi. Sed ridiculus non, imperdiet turpis, vel eros, id orci eros in tempus mattis eros, aliquam ipsum id pede suspendisse nisl. Turpis in erat sodales, dignissim ut, maecenas nec torquent vestibulum amet, imperdiet nec porttitor urna vel rutrum a, leo arcu dolor gravida. Velit morbi."
      },
      {
        title: "Mollis commodo lectus tempus",
        icon: "images/meter.png",
        description: "Suscipit magna at vel. Purus eu elementum ullamcorper semper nec, massa nascetur tempor neque neque velit. Aliquet phasellus imperdiet in nam dictum. Donec amet a, est sit vivamus nullam ut, suspendisse etiam molestie. Vitae sed nec omnis turpis vivamus sed, eu curabitur aenean lacus suspendisse. Tempus orci nisl at donec vitae, ut tincidunt amet ac suspendisse morbi, nulla nec morbi eget sem rutrum eget. Vestibulum tempor neque lacus phasellus massa interdum, in purus et malesuada aliquam nec erat, lorem et cras penatibus ac, accumsan magna adipiscing sapien."
      },
      {
        title: "Cras lorem non nunc",
        icon: "images/calc.png",
        description: "Tempor diam erat erat purus, cursus suspendisse libero aliquam augue libero aptent, adipiscing potenti urna consequat. Orci sociis volutpat, urna mauris sed sed, ante cursus, eu vestibulum lectus vitae ultrices vestibulum non. Sit delectus fusce felis dignissim velit morbi, mus scelerisque quam, libero in interdum ut rutrum duis massa, rutrum orci aliquam nibh doloremque quis metus, quam eget. Quis elit. Ac porttitor at elementum enim lectus, egestas augue non aliquam lorem lacinia, magna quam leo. "
      },
      {
        title: "Dui maecenas morbi",
        icon: "images/meter.png",
        description: "Dictum felis porta, purus viverra in nonummy, magna tristique, duis fames eget id, hac eget id erat donec dolor. Cubilia tellus porttitor fringilla egestas. Sit ac nisl sed, commodo ac egestas, eget aliquam in potenti sem explicabo purus, a dui consectetuer, et proin massa molestie nibh vitae quisque."
      },
    ]

});