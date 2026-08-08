import React, { useEffect, useRef } from 'react';

export default function YouTubePlayer({
  videoId,
  onReady,
  onTimeUpdate,
  isPreviewing,
  startTimeSec,
  endTimeSec,
  onPreviewEnd
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;

    // Function to initialize YT player
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) { console.warn(e); }
      }

      playerRef.current = new window.YT.Player(`yt-player-${videoId}`, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (onReady) onReady(event.target);
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING === 1
            if (event.data === 1) {
              startTrackingTime();
            } else {
              stopTrackingTime();
            }
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      stopTrackingTime();
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) { console.warn(e); }
      }
    };
  }, [videoId]);

  const startTrackingTime = () => {
    stopTrackingTime();
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const curr = playerRef.current.getCurrentTime();
        if (onTimeUpdate) onTimeUpdate(curr);

        // Handle auto-stop for clip preview
        if (isPreviewing && endTimeSec && curr >= endTimeSec) {
          playerRef.current.pauseVideo();
          if (onPreviewEnd) onPreviewEnd();
        }
      }
    }, 200);
  };

  const stopTrackingTime = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%', // 16:9 aspect ratio
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      backgroundColor: '#000',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div
        id={`yt-player-${videoId}`}
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
