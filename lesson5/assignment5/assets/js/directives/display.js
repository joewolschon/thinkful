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