angular.module('app').controller('InstagramSearcherCtrl', function ($scope, instagram, $log) {

  $scope.max = [1,1,1,1];

  $scope.search = '';

  $scope.results = undefined;

  $scope.submit = function () {

    var search = $scope.search;
    $scope.search = '';
    $scope.searching = true;

    instagram.search(search).then(function (response) {
      $log.log(response);

      $scope.results = response.data;

    }).finally(function (data) {
      $log.log('finally', data);
      $scope.searching = false;
    });
//    $http.jsonp('https://api.instagram.com/v1/tags/search', {
//      method: 'GET',
//      params: {
//        client_id: '749d8265ce234c198ed79664225b0660',
//        callback: 'JSON_CALLBACK',
//        q: $scope.search
//      }
//    }).success(function (data) {
//      $log.log('success', data);
//    }).error(function (data) {
//      $log.log('error', data);
//    });
  };

});