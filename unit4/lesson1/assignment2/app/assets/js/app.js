var app = angular.module('app', [ 'firebase' ]);
app
  .constant('FIREBASE_URL', 'https://blinding-fire-8736.firebaseio.com/')
  .factory('firebaseReference', function(FIREBASE_URL){
    return new Firebase( FIREBASE_URL );
  });