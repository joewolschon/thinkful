angular.module('countriesApp', ['ngRoute', 'ngAnimate', 'countriesAppViews', 'geonames'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.otherwise({
    redirectTo : '/'
  });
}]);
