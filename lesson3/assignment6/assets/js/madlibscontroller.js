angular.module('app', []).controller('MadLibsCtrl', function ($scope)
{
    $scope.model = {};

    $scope.init = function()
    {
       $scope.model = {gender: 'male'};
       $scope.form.$setPristine();
    };

    $scope.words = {
        'male': {pronoun: 'he', noun: 'him', possessive: 'his'},
        'female': {pronoun: 'she', noun: 'her', possessive: 'her'}
    };

});