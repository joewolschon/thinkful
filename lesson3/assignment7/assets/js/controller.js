angular.module('app', []).controller('CalculatorCtrl', function ($scope) {

  $scope.submit = function () {
    console.log("submit");
    if (!isNaN($scope.mealDetails.taxRate) && !isNaN($scope.mealDetails.taxRate) && !isNaN($scope.mealDetails.tipPercentage)) {
      var base = parseFloat($scope.mealDetails.baseMealPrice);
      $scope.totals.subTotal = base + (base * (parseFloat($scope.mealDetails.taxRate) / 100));
      $scope.totals.tip = base * (parseFloat($scope.mealDetails.tipPercentage) / 100);
      $scope.totals.total = $scope.totals.subTotal + $scope.totals.tip;

      $scope.totals.tipTotal = $scope.totals.tipTotal + $scope.totals.tip;
      $scope.totals.mealCount = $scope.totals.mealCount + 1;
      $scope.totals.averageTipPerMeal = $scope.totals.tipTotal / $scope.totals.mealCount;

      $scope.clearMealDetails();
    } else {
      $scope.mealDetails.error = 'Invalid Input';
    }
  };

  $scope.clearMealDetails = function () {
    $scope.mealDetails = {
      baseMealPrice: NaN,
      taxRate: NaN,
      tipPercentage: NaN,
      errorMessage: ''
    };
  };

  $scope.reset = function () {
    $scope.clearMealDetails();
    $scope.totals = {
      subTotal: 0.00,
      tip: 0.00,
      total: 0.00,
      tipTotal: 0.00,
      mealCount: 0,
      averageTipPerMeal: 0.00
    };
  };

});