import React from 'react'
import trackResStyle from './TrackResults.module.css'
function TrackResults({ track, key,chooseTrack }) {
    function handlePlay() {
        chooseTrack(track);
    }
    return (
        <>
            <div key={key} className={`${trackResStyle.song}  d-flex m-2 align-items-center`} onClick={handlePlay}>
                <img src={track.albumUrl} style={{ width: "64px", height: "64px" }} alt={track.title} />
                <div className="ml-3">
                    <div>{track.title}</div>
                    <div className="text-muted"> {track.artist}</div>
                </div>
            </div>
        </>
    )
}

export default TrackResults
