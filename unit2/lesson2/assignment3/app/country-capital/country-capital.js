views.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/countries/:countryCode/capital', {
        templateUrl: './country-capital/country-capital.html',
        controller: 'CountryCapitalCtrl',
        resolve: {
            countryCode: ['$route', function ($route) {
                return $route.current.params.countryCode;
            }]
        }
    });
}]);

views.controller('CountryCapitalCtrl', ['$scope', 'geonamesApi', 'countryCode', '$location', function ($scope, geonamesApi, countryCode, $location) {
    $scope.browseCountries = function () {
        $location.path("/countries");
    };

    $scope.home = function () {
        $location.path("/");
    };

    var countryInfoSuccess = function (data) {
        if (data.geonames.length > 0) {
            $scope.country = data.geonames[0];
            geonamesApi.capital(countryCode, $scope.country.capital).then(capitalSuccess);
        }
    };

    var neighborsSuccess = function (data) {
        $scope.neighbors = data.geonames;
    };

    var capitalSuccess = function (data) {
        if (data.geonames != 1) {
            $scope.capital = data.geonames[0];
        }
    };

    if (countryCode) {
        geonamesApi.countryInfo(countryCode).then(countryInfoSuccess).finally(function () {
            $scope.countryInfoFinished = true;
        });

        geonamesApi.neighbors(countryCode).then(neighborsSuccess);
    }

}]);