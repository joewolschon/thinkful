var app = angular.module('OWMApp', ['ngRoute', 'ngAnimate']);
app.value('owmCities', ['New York', 'Dallas', 'Chicago']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: './home.html', controller: 'HomeCtrl'});

    $routeProvider.when('/error', {
        template: '<p>Error Page Not Found</p>'
    });

    $routeProvider.when('/cities/:city', {
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
    });

    $routeProvider.otherwise({redirectTo: '/error'});
});

app.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        $timeout(function() {
            $rootScope.isLoading = false;
        }, 1000);
    });
});

app.controller('HomeCtrl', function ($scope) {
    //empty for now
});

app.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
});
