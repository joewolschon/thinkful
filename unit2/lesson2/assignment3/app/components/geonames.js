angular.module('geonames', ['ngResource']).constant('GEONAMES_API', "http://api.geonames.org/:resource?")

  .factory('search', ['$resource', '$log', 'GEONAMES_API', function ($resource, $log, GEONAMES_API) {
    $log.log(GEONAMES_API);
    var Search = $resource(GEONAMES_API, {resource: 'search', username: 'jwolschon', type: 'JSON'}, {'get': {method: 'GET', cache: true}});
    return function (country) {
      return Search.get({resource: 'countryInfo'}).$promise;
    }
  }]);
