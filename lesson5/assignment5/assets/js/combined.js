angular.module('app', ['ngResource']);
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
angular.module('app').directive('display', function ($log) {

  return {
    scope: {
      results: '='
    },
    restrict: 'A',
    link: function (scope, elem) {

      var element = '<table>';

      $log.log(scope.results);
      for (var index = 0; index < 20; index++) {
        if (index <= scope.results.length - 1) {
          element = element + '<tr><td><img src=\"' + scope.results[index].images.thumbnail.url + '\"/></td></tr>';
        }
      }
      element = element + '</table>';
      $log.log(element);
      elem.append(element);

    }
  };

});
angular.module('app').service('instagram', function ($resource) {

  var InstaGram = $resource('https://api.instagram.com/v1/tags/:tag/media/recent', {tag: '@tag'}, {'get': {method: 'JSONP', params : {callback : 'JSON_CALLBACK'}}});

  this.search = function (tag) {
    return InstaGram.get({tag: tag, client_id: '749d8265ce234c198ed79664225b0660'}).$promise;
  };

});