import './video-player.css'
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer() {
    const playerRef = useRef(null);
    const vid_url = "kqtD5dpn9C8"

    return (
        <div className="react-player-wrapper">
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${vid_url}`}
                light={1}
                playing="True"
                width="90%"
                height="90vh"
                onProgress={(state) => {
                    if (state.playedSeconds > 100) {
                        playerRef.current?.seekTo(10);
                        if (playerRef.current?.pause) {
                            playerRef.current.pause();
                        }
                    }
                }}
            />
        </div>
    );
}