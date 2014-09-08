angular.module('app', ['ngAnimate']).controller('MadLibsCtrl', function ($scope) {

  // Initialize to empty object or add all view property names so it's easier to see what's used in the
  // view? defaults = {gender: '', jobTitle: ''} etc.
  var defaults = {
    gender: 'male'
  };

  $scope.model = {};
  $scope.showMadLib = undefined;

  $scope.init = function () {
    $scope.model = angular.copy(defaults);
    $scope.form.$setPristine();
    $scope.showMadLib = undefined;
  };

  $scope.words = {
    'male': {pronoun: 'he', noun: 'him', possessive: 'his'},
    'female': {pronoun: 'she', noun: 'her', possessive: 'her'}
  };

  $scope.generateMadLib = function () {
    $scope.showMadLib = $scope.form.$valid;
  };

});