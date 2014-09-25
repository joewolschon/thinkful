angular.module('geonames', ['ngResource']).constant('GEONAMES_API', "http://api.geonames.org/:resource?")

    .factory('search', ['$resource', '$log', 'GEONAMES_API', function ($resource, $log, GEONAMES_API) {
        $log.log(GEONAMES_API);
        var Search = $resource(GEONAMES_API, {resource: 'search', username: 'jwolschon', type: 'JSON'}, {'get': {method: 'GET', cache: true}});
        return function () {
            return Search.get({resource: 'countryInfo'}).$promise;
        }
    }])
    .factory('country', ['$resource', '$log', 'GEONAMES_API', function ($resource, $log, GEONAMES_API) {
        $log.log(GEONAMES_API);
        var Search = $resource(GEONAMES_API, {resource: 'search', username: 'jwolschon', type: 'JSON'});
        return function (country) {
            return Search.get({resource: 'countryInfo', country: country}).$promise;
        }
    }])
    .factory('neighbors', ['$resource', '$log', 'GEONAMES_API', function ($resource, $log, GEONAMES_API) {
        $log.log(GEONAMES_API);
        var Search = $resource(GEONAMES_API, {resource: 'neighbours', username: 'jwolschon', type: 'JSON'});
        return function (country) {
            return Search.get({resource: 'neighbours', country: country}).$promise;
        }
    }])
    .factory('capital', ['$resource', '$log', 'GEONAMES_API', function ($resource, $log, GEONAMES_API) {
        $log.log(GEONAMES_API);
        var Search = $resource(GEONAMES_API, {resource: 'search', username: 'jwolschon', type: 'JSON'});
        return function (country, capital) {
            return Search.get({resource: 'search', country: country, isNameRequired: true, name_startsWith: capital, q: 'capital of a political entity'}).$promise;
        }
    }])
;
