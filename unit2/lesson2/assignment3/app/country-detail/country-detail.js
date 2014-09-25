views.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: './country-detail/country-detail.html',
        controller: 'CountryDetailCtrl',
        resolve: {
            countryCode: ['$route', function ($route) {
                return $route.current.params.countryCode;
            }]
        }
    });
}]);

views.controller('CountryDetailCtrl', ['$scope', 'country', 'neighbors' , 'capital', '$log', 'countryCode', function ($scope, country, neighbors, capital, $log, countryCode) {

    var countryDetailsSuccess = function (data) {
        if (data.geonames != 1) {
            $scope.country = data.geonames[0];
            capital(countryCode, $scope.country.capital).then(capitalDetailsSuccess);
        }
    };

    var neighborDetailsSuccess = function (data) {
        $scope.neighbors = data.geonames;
    };

    var capitalDetailsSuccess = function (data) {
        if (data.geonames != 1) {
            $scope.capital = data.geonames[0];
            $log.log($scope.capital);
        }
    };

    if (countryCode) {
        country(countryCode).then(countryDetailsSuccess);
        neighbors(countryCode).then(neighborDetailsSuccess);
    }

}]);