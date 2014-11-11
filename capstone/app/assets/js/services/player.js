angular.module('app').service('player', function ($rootScope, $timeout, $log) {
  var tracks = null;
  var currentTrack = null;
  var soundManager = null;
  var currentPosition = null;
  var whilePlayingCallback = null;

  var onPlay = function () {
     $log.log('play12');
  };

  var onFinish = function () {
    $log.log('finish');
    playNext();
  };

  var onStop = function () {
    $log.log('stop');
  };

  var whilePlaying = function() {
    $log.log('playing', this.position);
    currentPosition = this.position;
    $rootScope.apply();
  };

  var options = {onplay: onPlay, onfinish: onFinish, onstop: onStop, usePeakData: true, useWaveformData: true, useEQData: true };

  SC.get('/tracks', function (trackData) {
    tracks = trackData;
    $log.log(tracks);
    $rootScope.$apply();
  });

  this.start = function (whilePlaying) {
    this.stop();
    options.whileplaying = whilePlaying;
    playNext();
  };

  var playNext = function()
  {
    currentTrack = tracks[0];
    tracks = tracks.slice(1, tracks.length - 1);
    SC.stream(currentTrack.stream_url, options, function (soundManagerObj) {
      $log.log('test',soundManagerObj);
      soundManager = soundManagerObj;
      soundManager.play();
    }, function(shit)
    {
      $log.log(shit);
    });
  };

  this.stop = function () {
    if (soundManager) {
      soundManager.stop();
    }
  };

  this.pause = function() {

  };

  this.getCurrentTrack_ = function () {
    return currentTrack;
  };

  this.getTracks_ = function () {
    return tracks;
  };

  this.onStreaming = function () {

  };

  this.getCurrentPosition_ = function()
  {
    return currentPosition;
  }

});