angular.module('app').directive('chat', function( ) {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: "assets/partials/chat.tmpl.html",
    scope: {},
    controllerAs: 'ctrl',
    controller: function($scope, $firebase, firebaseReference){
      $scope.messages = $firebase(
        firebaseReference.child('messages')
      ).$asArray();
      this.sendMessage = function(send){
        // do some validation
        if ( !send.message ) return false;
        // save the message
        $scope.messages.$add({
          message: send.message.trim(),
          userName: send.userName,
          datetime: Date.now()
        });
        $scope.send.message = "";
      }
    }
  };
});