angular.module('app').directive('megaVideo', function ($sce) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'assets/mega-video/assets/partials/mega-video.html',
    link: function(scope, element, attrs) {
      var videoPlayer = element.find('video')[0];
      scope.sources = [];
      // whitelist of video formats accepted
      function processSources() {
        var sourceTypes = {
          webm: { type: 'video/webm'},
          mp4: { type: 'video/mp4'},
          ogg: { type: 'video/ogg'}
          // etc...
        };
        for (source in sourceTypes) {
          if (attrs.hasOwnProperty(source)) {
            scope.sources.push(
              { type: sourceTypes[source].type,
                src: $sce.trustAsResourceUrl(attrs[source])
              }
            );
          }
        }
      }
      processSources();

      scope.video =  {
        play: function() {
          videoPlayer.play();
          scope.video.status = 'play';
        },
        pause: function() {
          videoPlayer.pause();
          scope.video.status = 'pause';
        },
        stop: function() {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
          scope.video.status = 'stop'
        },
        togglePlay: function() {
          scope.video.status == 'play' ? this.pause() : this.play();
        },
        width: attrs.width,
        height: attrs.height
      };
    }
  }
});