angular.module('app').directive('optIn', function(){
   return {
     restrict: 'E',
     transclude: true,
     templateUrl: 'assets/opt-in/assets/partials/opt-in.html',
     replace: true
   }
});