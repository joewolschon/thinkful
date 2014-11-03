angular.module('app').directive('day', function ($log) {
    return {
        restrict: 'A',
        require: '?^calender',
        templateUrl: './assets/partials/day.html',
        link: function (scope, element, attrs, calendarController) {
            $log.log(calendarController);
            scope.paddedDay = function(day)
            {
                var range = calendarController.getRange();
                var start = moment(range.start);
                var end = moment(range.end);
                var date = moment(day.date);
                var paddedDay = date.isBefore(start, 'day') || date.isAfter(end, 'day');

                return paddedDay;
            };
        }
    };

});