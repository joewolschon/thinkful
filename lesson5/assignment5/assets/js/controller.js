angular.module('app', []).controller('InstagramSearcherCtrl', function ($scope, $http, $q, $log) {

  $scope.search = '';

  $scope.submit = function () {
    $http({
      url: 'https://api.instagram.com/v1/tags/search',
      method: 'GET',
      params: {
        client_id: '749d8265ce234c198ed79664225b0660',
        client_secret: 'fb3967fbb9764bd9b6d112b9d9bcaa49',
        grant_type: 'authorization_code',
        redirect_uri: 'http://eevne.github.io/thinkful/',
        q: $scope.search
      }
    }).success(function (data) {
      $log.log('success', data);
    }).error(function (data) {
      $log.log('error', data);
    });
  };

});