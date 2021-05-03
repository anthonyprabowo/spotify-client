import React from 'react';

export default function TrackResult({track, chooseTrack}) {
  const handleClick = () => {
    chooseTrack(track);
  }
  return (
    <div className="d-flex m-2 align-items-center" style={{ cursor: "pointer" }} onClick={handleClick}>
      <img src={track.albumUrl} alt="album images" style={{height: "64px", width: "64px"}} />
      <div className="ml-3">
        <div>{track.trackName}</div>
        <div className="text-muted">{track.artistsName}</div>
      </div>
    </div>
  )
}