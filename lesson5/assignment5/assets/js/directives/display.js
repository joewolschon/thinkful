angular.module('app').directive('display', function ($log, $compile, $sce) {

  return {
    scope: {
      results: '='
    },
    restrict: 'A',
    link: function (scope, elem) {
      var display = angular.element('<table></table>');


//      display.append(tr);
//      $log.log($compile(display));
      $log.log('data', scope.results);
//      $sce.trustAsResourceUrl("http://scontent-a.cdninstagram.com/hphotos-xfp1/t51.2885-15/10547317_594503763988724_1443258421_s.jpg");
      var r = scope.results;
      var e = '<table width="100%">';
      var count = 0;
      for (var row = 0; row < 5; row++) {
        var t = '';
//        var test = '<td>*</td>';
//        var row = angular.element('<tr></tr>');
        for (var col = 0; col < row; col++) {
          var index = ((row * 4) + col);
         // $log.log('index', count);
          var im = (r, (count));
          if (im !== null) {
            t = t + '<td>' + image(r, (count)) + '</td>';
          }
          count = count + 1;
        }
        t = t + '</tr>';
        e = e + t;

        t = '<tr><td>*</td>';
      }

      for (var row = 5; row > 0; row--) {
        var t = '';
//        var test = '<td>*</td>';
//        var row = angular.element('<tr></tr>');
        for (var col = 0; col < row; col++) {
          var index = ((row * 4) + col);
         // $log.log('index', count);
          var im = (r, (count));
          if (im !== null) {
            t = t + '<td>' + image(r, (count)) + '</td>';
          }
          count = count + 1;
        }
        t = t + '</tr>';
        e = e + t;

        t = '<tr><td>*</td>';
      }

      e = e + '</table>';
      $log.log(e);
      var test = angular.element(e);
//      $compile(test);
      elem.append(test);
//      $compile(elem);
    },
    replace: true
  };

  function image(results, index) {
    $log.log(index, results.length);
    if (index <= results.length - 1 && index < 20) {
      $log.log(index);
//    var url = "http://scontent-a.cdninstagram.com/hphotos-xfp1/t51.2885-15/10547317_594503763988724_1443258421_s.jpg";
      var url = results[index].images.thumbnail.url;
      return '<img src=\"' + url + '\"/>';
    }
    return null;
  }

});