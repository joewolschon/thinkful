/* globals google*/
var app = angular.module('app', ['ngResource']);
app.controller('controller', function ($scope, $log) {
  $scope.model = {
    address: '',
    city: '',
    state: '',
    zip: ''
  };

  $scope.click = function () {
    $log.log($scope.model);
  }
});


app.directive('addressAutoComplete', function ($log) {
  return {
    restrict: 'A',
    controller: function ($scope) {
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      $scope.elements = {};

      this.addField = function (addressField, scope) {
        $scope.elements[addressField] = scope;
      };

      this.update = function (place) {
        angular.forEach(place.address_components, function (val) {
            $log.log(val, componentForm[val.types[0]], val[componentForm[val.types[0]]]);
        });
      };

      this.updateAddress = function (address, t) {
        $log.log(address, t);
        $scope.elements['address'].model = address[0];
        $scope.elements['city'].model = address[1];
        $scope.elements['state'].model = address[2].trim().split(' ')[0];
        $scope.elements['zip'].model = address[2].trim().split(' ')[1];

        $scope.$apply();
        $scope.test = t;
      };
    }
  }
});
app.directive('addressField', function () {
  return {
    scope: {
      model: '=ngModel'
    },
    restrict: 'A',
    require: '^addressAutoComplete',
    link: function (scope, element, attrs, autoComplete) {
      autoComplete.addField(attrs.addressField, scope);
    }
  }
});
app.directive('autoComplete', function ($log) {
  return {
    restrict: 'A',
    require: '^addressAutoComplete',
    link: function (scope, element, attrs, autoComplete) {
      var ac = new google.maps.places.Autocomplete(element[0]);
      google.maps.event.addListener(ac, 'place_changed', function () {
        $log.log(ac.getPlace());
        var address = ac.getPlace().formatted_address.split(',');
        autoComplete.updateAddress(address, ac.getPlace().adr_address);
        autoComplete.update(ac.getPlace());
      });
    }
  }
});





















