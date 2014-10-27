angular.module('app').directive('calender', function ($log) {


  return {
    restrict: 'A',
    templateUrl: 'assets/partials/calender.html',
    controller: function ($scope) {
      var date;

      var init = function () {
        date = moment().startOf('month');
        $scope.calendar = {};
        $scope.calendar.month = date.month() + 1;
        $scope.calendar.year = date.year();

        $scope.range = CalendarRange.getMonthlyRange(date.toDate());
      };

      init();
    },
    compile: function (elem) {
//
//      var options = '';
//
//      angular.forEach(months, function(month) {
//        options = options + '<option value="' + month.value + '">' + month.key + '</option>';
//      });
//
//      elem.append(options);
    }
  };
});