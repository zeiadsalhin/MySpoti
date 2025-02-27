export function createSilentVideoPlayer(track) {

    // Set up the MediaSession metadata for playback controls and metadata display
    // if ('mediaSession' in navigator) {
    const artwork = track.album.images[0].url || "https://www.creativefabrica.com/wp-content/uploads/2021/07/10/music-player-icon-song-Play-icon-Graphics-14548112-1-1-580x386.jpg";  // Fallback image if no artwork

    navigator.mediaSession.metadata = new MediaMetadata({
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        artwork: [
            { src: artwork, sizes: '96x96', type: 'image/png' },
            { src: artwork, sizes: '128x128', type: 'image/png' },
            { src: artwork, sizes: '192x192', type: 'image/png' }
        ]
    });
    // }

    // Handle play/pause actions from MediaSession API
    navigator.mediaSession.setActionHandler('play', () => {
        console.log('Play triggered');
        videoElement.play();  // Start playback if required
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        console.log('Pause triggered');
        videoElement.pause();  // Pause the video if required
    });
}
