views.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/countries', {
    templateUrl: './countries/countries.html',
    controller: 'CountriesCtrl'
  });
}]);

views.controller('CountriesCtrl', ['$scope', function ($scope) {

}]);