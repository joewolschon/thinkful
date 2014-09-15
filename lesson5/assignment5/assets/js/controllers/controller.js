angular.module('app').controller('InstagramSearcherCtrl', function ($scope, instagram, $log) {

  $scope.search = undefined;
  $scope.lastSearch = undefined;
  $scope.searching = undefined;
  $scope.results = undefined;

  $scope.submit = function () {
    $scope.results = undefined;
    $scope.lastSearch = $scope.search;
    $scope.search = undefined;
    $scope.searching = true;

    instagram.search($scope.lastSearch).then(function (response) {
      $log.log(response);

      $scope.results = response.data;
    }).finally(function () {
      $scope.searching = false;
    });

  };

});