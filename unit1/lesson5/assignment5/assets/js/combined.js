angular.module('app', ['ngResource', 'ngAnimate']);
angular.module('app').service('instagram', function ($resource) {

    var InstaGram = $resource('https://api.instagram.com/v1/tags/:tag/media/recent', {tag: '@tag'}, {'get': {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}}});

    this.search = function (tag) {
        return InstaGram.get({tag: tag, client_id: '749d8265ce234c198ed79664225b0660'}).$promise;
    };

});
angular.module('app').controller('InstagramSearcherCtrl', function ($scope, instagram, $log) {

    $scope.search = undefined;
    $scope.lastSearch = undefined;
    $scope.searching = undefined;
    $scope.results = undefined;

    $scope.submit = function () {
        $scope.results = undefined;
        $scope.lastSearch = $scope.search;
        $scope.search = undefined;
        $scope.searching = true;

        instagram.search($scope.lastSearch).then(searchSuccess, searchError)
            .finally(function () {
                $scope.searching = false;
            })
    };

    $scope.viewImage = function (url) {
        $scope.viewImageUrl = url;
    };

    $scope.clearImage = function () {
        $scope.viewImageUrl = undefined;
    };

    var searchSuccess = function (response) {
        $scope.results = response.data;
    };

    var searchError = function () {
        $scope.results = false;
    };

});