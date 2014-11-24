/**
 * Directive to display information about the current track that is playing.
 * @author Joseph Wolschon <joseph.wolschon@gmail.com>
 */
angular.module('app').directive('currentTrack', function (player, ngProgress, $log) {

  // Process bar styling. TODO: not sure if I'm going to keep this...
  ngProgress.color('black');
  ngProgress.height('10px');

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'assets/partials/currentTrack.html',
    controller: function ($scope, player) {
      $scope.percent = 0;
      var playing = false;

      /**
       * Update progress bar. TODO: fancy equilizer/peak shit
       *@private
       */
      var whilePlaying = function () {
        var newPercent = Math.round((this.position / $scope.track.duration) * 100);
        if (newPercent !== $scope.percent) {
          $scope.percent = newPercent;
          ngProgress.set($scope.percent);
        }
      };

      $scope.$watch(player.tracksLoaded, function (loaded) {
        if (loaded && !playing) {
          playing = true;
          player.start(whilePlaying);
        }
      });

    },
    link: function (scope) {
      scope.$watch(player.getCurrentTrack_, function (track) {
        $log.log('current track', track);
        scope.track = track;
      });
    }
  }
});