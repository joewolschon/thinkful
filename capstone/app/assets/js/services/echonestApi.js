/**
 * Service for finding artist information
 * @author Joseph Wolschon <joseph.wolschon@gmail.com>
 */
angular.module('app').service('echonestApi', function ($resource, $rootScope) {

  var ArtistInfo = $resource('http://developer.echonest.com/api/v4/song/search');

  this.getArtistLocation = function (track) {
    var params = {
      api_key: 'JWFXTP4DHXIGTNSAN',
      bucket: ['artist_location'],
      combined: track.title
    };

    return ArtistInfo.get(params).$promise;
  };
});