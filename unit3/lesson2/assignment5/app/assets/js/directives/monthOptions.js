angular.module('app').directive('monthOptions', function () {

  var months = [
    {key : 'January', value : '1'},
    {key : 'February', value : '2'},
    {key : 'March', value : '3'},
    {key : 'April', value : '4'},
    {key : 'May', value : '5'},
    {key : 'June', value : '6'},
    {key : 'July', value : '7'},
    {key : 'August', value : '8'},
    {key : 'September', value : '9'},
    {key : 'October', value : '10'},
    {key : 'November', value : '11'},
    {key : 'December', value : '12'}
  ];

  return {
    restrict : 'A',
    compile : function(elem) {

      var options = '';

      angular.forEach(months, function(month) {
        options = options + '<option value="' + month.value + '">' + month.key + '</option>';
      });

      elem.append(options);
    }
  };
});