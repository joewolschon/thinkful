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