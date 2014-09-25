views.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './home/home.html',
    controller: 'HomeCtrl'
  });
}]);

views.controller('HomeCtrl', ['$scope', 'search', '$log', function ($scope, search, $log) {


  $scope.get = function () {
    search(undefined).then(function (data) {
      $scope.geonames = data.geonames;
      angular.forEach(data.geonames, function (val) {
        $log.log(val);
      });
      $log.log(data);
    });
  };

}]);