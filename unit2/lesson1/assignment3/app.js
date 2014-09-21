var app = angular.module('waitstaff', ['ngRoute', 'ngAnimate']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: './home.html'

    });

    $routeProvider.when('/new-meal', {
        templateUrl: './new-meal.html',
        controller: 'NewMealCtrl'

    });

    $routeProvider.when('/my-earnings', {
        templateUrl: './my-earnings.html',
        controller: 'MyEarningsCtrl'
    });

});

app.controller('NewMealCtrl', function ($scope, earnings) {
    var defaultMealDetails = {
        base: undefined,
        tax: undefined,
        tip: undefined
    };

    var defaultCustomerCharges = {
        subTotal: 0.00,
        tip: 0.00,
        total: 0.00
    };

    $scope.mealDetails = angular.copy(defaultMealDetails);
    $scope.customerCharges = angular.copy(defaultCustomerCharges);

    $scope.cancel = function () {
        $scope.form.$setPristine();
        $scope.mealDetails = angular.copy(defaultMealDetails);
        $scope.customerCharges = angular.copy(defaultCustomerCharges);
    };

    $scope.submit = function () {
        var tax = $scope.mealDetails.base * ($scope.mealDetails.tax || 0.00);
        var tip = $scope.mealDetails.base * ($scope.mealDetails.tip || 0.00);
        $scope.customerCharges.subTotal = $scope.mealDetails.base + (tax / 100);
        $scope.customerCharges.tip = tip / 100;
        $scope.customerCharges.total = $scope.customerCharges.subTotal + $scope.customerCharges.tip;
        earnings.update($scope.customerCharges.tip);
    };
});

app.controller('MyEarningsCtrl', function ($scope, earnings) {

    $scope.init = function () {
        $scope.tipTotal = earnings.getTipTotal();
        $scope.mealCount = earnings.getMealCount();
        $scope.tipAverage = earnings.getTipAverage();
    };

    $scope.reset = function () {
        earnings.reset();
        $scope.init();
    };
});

app.service('earnings', function () {

    var mealCount = 0;
    var tipTotal = 0.00;

    this.update = function (tipAmount) {
        tipTotal = tipTotal + tipAmount;
        mealCount = mealCount + 1;
    };

    this.reset = function () {
        mealCount = 0.00;
        tipTotal = 0.00;
    };

    this.getTipTotal = function () {
        return tipTotal;
    };

    this.getMealCount = function () {
        return mealCount;
    };

    this.getTipAverage = function () {
        return tipTotal / mealCount || 0.00;
    };

});