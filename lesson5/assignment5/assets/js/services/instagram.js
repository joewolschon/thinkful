angular.module('app').service('instagram', function ($resource) {

  var InstaGram = $resource('https://api.instagram.com/v1/tags/:tag/media/recent', {tag: '@tag'}, {'get': {method: 'JSONP', params : {callback : 'JSON_CALLBACK'}}});

  this.search = function (tag) {
    return InstaGram.get({tag: tag, client_id: '749d8265ce234c198ed79664225b0660'}).$promise;
  };

});