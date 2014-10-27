angular.module('app').directive('volumeSlider', function ($log) {
  return {
    require: '?^megaVideo',
    restrict: 'A',
    link: function(scope, element, attrs, megaVideoController) {
      var initialVolume = parseFloat(attrs.initialVolume);
      megaVideoController.setVolume(initialVolume);
      angular.element(element.slider({
        min: 0,
        max: 1,
        step: 0.01,
        value: initialVolume,
        orientation: "horizontal",
        slide: function(event, ui) {
          scope.$apply(function(){
            megaVideoController.setVolume(ui.value);
          })
        },
        change: function(event, ui) {
          scope.$apply(function(){
            megaVideoController.setVolume(ui.value);
          })
        }
      }));
    }
  }
});