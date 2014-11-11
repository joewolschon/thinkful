angular.module('app').directive('playlist', function(player, $log)
{
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'assets/partials/playlist.html',
    controller: function($scope)
    {
//      $log.log('here');
//      SC.get('/tracks', {downloadable: true}, function(tracks)
//      {
//        $log.log(tracks);
//        $scope.tracks = tracks;
//        $scope.$apply();
//      });


      $scope.play = function(streamUrl)
      {
        SC.stream(streamUrl, function(test)
        {
//          test.play();
          $log.log(test);
        });
      }
    },
    link: function(scope)
    {
         scope.$watch(player.getTracks_, function(tracks){
           $log.log(tracks);
           scope.tracks = tracks;
         });
    }
  }

});