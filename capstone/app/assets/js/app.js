var app = angular.module('app', ['ngProgress', 'ngResource']);

app.config(function () {
  SC.initialize({
    client_id: "2553d3948bd996a6f522c024161d134b",
    redirect_uri: "http://example.com/callback.html"
  });
});