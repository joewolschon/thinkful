views.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: './countries/countries.html',
        controller: 'CountriesCtrl'
    });
}]);

views.controller('CountriesCtrl', ['$scope', '$location', 'geonamesApi', function ($scope, $location, geonamesApi) {

    var ajaxCallsFinished = function () {
        $scope.ajaxCallsFinished = true;
    };

    geonamesApi.countries.then(function (data) {
        $scope.countries = data.geonames;
    }).finally(ajaxCallsFinished);

    $scope.viewCountry = function (countryCode) {
        $location.path('/countries/' + countryCode + '/capital');
    };

    $scope.home = function () {
        $location.path('/');
    };

}]);