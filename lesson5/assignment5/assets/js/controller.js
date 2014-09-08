angular.module('app', []).controller('InstagramSearcherCtrl', function ($scope, $http, $q) {

  $scope.submit = function () {
    getAcessToken();
  };

  function getAcessToken() {
    $http({
      url: '[https://api.instagram.com/v1/tags/search',
      params: {
        client_id: '749d8265ce234c198ed79664225b0660',
        client_secret: 'fb3967fbb9764bd9b6d112b9d9bcaa49',
        grant_type: 'authorization_code',
        redirect_uri: 'http://eevne.github.io/thinkful/',
        q: 'dog'
      }
    }).success(function (data) {
      console.log(data);
    }).error(function (data) {

    });

  }
});