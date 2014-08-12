angular.module('app', []).controller('CalculatorCtrl', function ($scope) {

  $scope.totalDefaults = {
   subTotal: 0.00,
   tip: 0.00,
   total: 0.00,
   tipTotal: 0.00,
   mealCount: 0,
   averageTipPerMeal: 0.00};

  $scope.totals = angular.copy($scope.totalDefaults);
  $scope.details = {};

  $scope.submit = function (details) {
    if($scope.form.$valid){
      var base = parseFloat(details.baseMealPrice);
      $scope.totals.subTotal = base + (base * (parseFloat(details.taxRate) / 100));
      $scope.totals.tip = base * (parseFloat(details.tipPercentage) / 100);
      $scope.totals.total = $scope.totals.subTotal + $scope.totals.tip;

      $scope.totals.tipTotal = $scope.totals.tipTotal + $scope.totals.tip;
      $scope.totals.mealCount = $scope.totals.mealCount + 1;
      $scope.totals.averageTipPerMeal = $scope.totals.tipTotal / $scope.totals.mealCount;
    }
  };

  $scope.clearDetails = function () {
    $scope.details = {};
    $scope.form.$setPristine();
  };

  $scope.reset = function () {
    $scope.clearDetails();
    angular.copy($scope.totalDefaults, $scope.totals);
  };

});