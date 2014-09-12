angular.module('app').directive('pic', function ($log) {

  return {
    scope: {},
    restrict: 'E',
    template: '<td><img ng-src=""/></td>',
    link: function (scope, element, attrs) {
      $log.log(attrs,'test');
    },
    replace: true
  }

});