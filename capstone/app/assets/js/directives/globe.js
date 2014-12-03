/**
 * Directive to display artists location on globe.
 * @author Joseph Wolschon <jwolschon@payjunciton.com
 */
angular.module('app').directive('globe', function(echonestApi, player, $log){
  //<span class="span">{{artistName}}</span><span class="coords"> {{title}}</span>
   return {
     restrict : 'E',
     scope: true,
     template: '<div class="coords">{{artistLocation}}</div>',
     controller: function($scope)
     {

     },
     link: function(scope)
     {

       if(!Detector.webgl){
         Detector.addGetWebGLMessage();
       } else {
         var container =  document.getElementById('container');
         var globe = DAT.Globe(document.getElementById('container'), function(label) {
           return new THREE.Color([
             0xd9d9d9, 0xb6b4b5, 0x9966cc, 0x15adff, 0x3e66a3,
             0x216288, 0xff7e7e, 0xff1f13, 0xc0120b, 0x5a1301, 0xffcc02,
             0xedb113, 0x9fce66, 0x0c9a39,
             0xfe9872, 0x7f3f98, 0xf26522, 0x2bb673, 0xd7df23,
             0xe6b23a, 0x7ed3f7][label]);
         });

         globe.animate();
       }

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