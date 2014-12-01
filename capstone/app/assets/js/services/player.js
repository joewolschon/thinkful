/**
 * @author Joseph Wolschon <joseph.wolschon@gmail.com>
 */
angular.module('app').service('player', function ($rootScope) {
    var mokb = 9251246;
    var gvb = 496642;
    var pitchfork = 175182;
    var users = [gvb, mokb];

    var trackIds = [];
    var currentTrack = null;
    var soundManager = null;
    var loaded = false;
    var options = null;

    /**
     * Add a track id to the list of tracks to play and start playing if we need to.
     * @param id of the track
     * @private
     */
    var addTrack_ = function (id) {
        trackIds.push(id);

        if (trackIds.length > 50 && loaded === false) {
            loaded = true;
            $rootScope.$apply();
        }

        trackIds.push(id);
    };

    /**
     * Add all the tracks for a given playlist.
     * @param id of the playlist
     * @private
     */
    var addPlayList_ = function (id) {
        return SC.get('/playlists/' + id, function (playlist) {
            angular.forEach(playlist.tracks, function (track) {
                addTrack_(track.id);
            });
        })
    };

    /**
     * Iterate through the users and snag any playlists they have and add all the songs from them to the list of
     * tracks to play. TODO: future add more users, find similar new songs using the playlists as a base
     * @private
     */
    var setSongs_ = function () {
        angular.forEach(users, function (user) {
            SC.get('/users/' + user + '/playlists', function (playlists) {
                angular.forEach(playlists, function (playlist) {
                    addPlayList_(playlist.id);
                });
            });
        });
    };

    /**
     * Play the next track in the list. If there's an error just skip to the one in the list. There's plenty of reasons
     * while playing a track could fail. Track data isn't current, the user could have change permissions on who can
     * stream the song, it could have been deleted, the user who uploaded the song could have been deleted etc.
     * @private
     */
    var playNext = function () {

        var index = Math.floor(Math.random() * (trackIds.length - 1));
        var trackId = trackIds[index];

        SC.get('/tracks/' + trackId, function (track) {

            // Grab another song if there's issues with this one.
            if (track === null
                || (track.errors && track.errors.length > 0)
                || !track.streamable || track.stream_url === null) {
                playNext();
                return;
            }

            currentTrack = track;
            $rootScope.$apply();

            SC.stream(currentTrack.stream_url, options, function (soundManagerObj) {
                if(soundManagerObj === null)
                {
                    playNext();
                    return;
                }
                soundManager = soundManagerObj;
                soundManager.play();
            }, playNext);
        });
    };

    /**
     * Start streaming tracks.
     * @param whilePlaying callback that will be periodically called by sound manager. Contains useful information such
     *   as current position of track, peak/equalizer data etc.
     */
    this.start = function (whilePlaying) {
        options = {
            onfinish: playNext,
            whileplaying: whilePlaying,
            usePeakData: true,
            useWaveformData: true,
            useEQData: true
        };
        playNext();
    };

    /**
     * Get the track that is currently streaming.
     * @returns {Object} current soundcloud track object
     * @private
     */
    this.getCurrentTrack_ = function () {
        return currentTrack;
    };

    /**
     * @returns {boolean} true if we have at least 1 track to play, otherwise false
     */
    this.tracksLoaded = function () {
        return loaded;
    };

    setSongs_();
});