angular.module('app').directive('currentTrack', function (player, ngProgress,  $log) {

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'assets/partials/currentTrack.html',
    controller: function ($scope) {
      $scope.percent = 0;
      ngProgress.color('#800080');
      ngProgress.height('10px')
      var whilePlaying = function () {

//        var gPixels = document.getElementById('testid').getElementsByTagName('div');
//        $log.log(this);
        var gScale = 32; // draw -32 to +32px from "zero" (i.e., center Y-axis point)
//        for (var i = 0; i < 256; i++) {
//          gPixels[i].style.top = (gScale + Math.ceil(this.waveformData.left[i] * -gScale)) + 'px';
//          $log.log('yo');
//        }
//        $log.log(this.position, $scope.track);
        var newPercent = Math.round((this.position / $scope.track.duration) *100);
        $log.log(this);
        if(newPercent !== $scope.percent)
        {
          $scope.percent = newPercent;
//          $log.log($scope.percent);
          ngProgress.set($scope.percent);
//          $scope.$apply();
        }
//        $log.log('playing', this.position);
      };

      $scope.play = function () {

        $log.log('play');
        player.start(whilePlaying);
      };

      $scope.stop = function () {
        player.stop();
      };
    },
    link: function (scope) {

      scope.$watch(player.getCurrentTrack_, function (track) {
        $log.log(track);
        scope.track = track;
      });

      scope.$watch(player.getCurrentPosition_, function (currentPosition) {
        $log.log('newposi');
        scope.currentPosition = currentPosition;
      });
    }
  }
});