/**
 * Directive to display artists location on globe.
 * @author Joseph Wolschon <jwolschon@payjunciton.com
 */
angular.module('app').directive('globe', function(echonestApi, player, $log){
   return {
     restrict : 'E',
     scope: true,
     template: '<div>{{artistName}}</div><div>{{title}}</div><div>{{artistLocation}}</div>',
     controller: function($scope)
     {

     },
     link: function(scope)
     {
       scope.$watch(player.getCurrentTrack_, function (track) {

         scope.track = track;
         if(track) {
           $log.log('getting artist info');
           echonestApi.getArtistLocation(track).then(function (data) {
             var songs = data.response.songs;
             if(songs.length > 0)
             {
               $log.log(songs);
               scope.artistName = songs[0].artist_name;
               scope.title = songs[0].title;
               scope.artistLocation = songs[0].artist_location;
             }else{
               $log.log('no songs');
             }

           }, function () {
             $log.log('error searching for songs');
           })
         }
       });
     }
   }
});