angular.module('geonames', ['ngResource'])

    .factory('geonamesApi', ['$resource', function ($resource) {
        var GeonamesApi = $resource('http://api.geonames.org/:endPoint?', {username: 'jwolschon', type: 'JSON'}, {'get': {method: 'GET', cache: true}});

        var request = function (endPoint, countryCode, params) {
            var request = {
                endPoint: endPoint,
                country: countryCode
            };

            angular.extend(request, params);
            return GeonamesApi.get(request).$promise;
        };

        return {
            countries: request('countryInfo'),
            countryInfo: function (countryCode) {
                return request('countryInfo', countryCode)
            },
            neighbors: function (countryCode) {
                return request('neighbours', countryCode)
            },
            capital: function (countryCode, capital) {
                return request('search', countryCode, {isNameRequired: true, name_startsWith: capital, q: 'capital of a political entity'})
            }
        }
    }]);
