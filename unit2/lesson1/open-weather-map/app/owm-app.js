var app = angular.module('OWMApp', ['ngRoute']);
app.value('owmCities', ['New York', 'Dallas', 'Chicago']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: './home.html',
            controller: 'HomeCtrl'})
        .when('/error',
        {
            template: '<p>Error Page Not Found</p>'})
        .when('/cities/:city',
        {
            templateUrl: './city.html',
            controller: 'CityCtrl',
            resolve: {
                city: function (owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    if (owmCities.indexOf(city) == -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.controller('HomeCtrl', function ($scope) {
    //empty for now
});
app.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
});
