angular.module('app').directive('controls', function (player, $log) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'assets/partials/controls.html',
    controller: function ($scope) {

      $scope.paused = false;
      $scope.pause = function () {

        if($scope.paused)
        {
          $log.log('resume');
          player.resume();
        }else{
          $log.log('pause');
          player.pause();
        }

        $scope.paused = !$scope.paused;
      };

      $scope.next = function () {
        $log.log('next');
        player.next();
      };
    }
  }
});