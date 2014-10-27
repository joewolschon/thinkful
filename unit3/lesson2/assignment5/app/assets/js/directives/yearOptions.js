angular.module('app').directive('yearOptions', function ($log) {

  var years = [];

  var currentYear = new Date().getFullYear();

  for (var year = currentYear-20; year <= (currentYear + 20); year++) {
    years.push(year);
  }

  return {
    restrict : 'A',
    compile : function(elem) {
      $log.log(elem);
      var options = '';

      angular.forEach(years, function(year) {
        options = options + '<option value="' + year + '">' + year + '</option>';
      });

      elem.append(options);
    }
  };
});