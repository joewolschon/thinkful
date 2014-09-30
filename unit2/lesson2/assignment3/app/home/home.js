views.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './home/home.html',
        controller: 'HomeCtrl'
    });
}]);

views.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.browseCountries = function () {
        $location.path("/countries");
    };

}]);