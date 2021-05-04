import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import TrackResult from './TrackResult';
import useAuth from './useAuth';
import Player from './Player';
const SpotifyWebApi = require('spotify-web-api-node');


const spotifyApp = new SpotifyWebApi({
  clientId: 'f016625a8e2e4936a3cb2761f9b4f1ef'
})
export default function MainPage({code}) {
  const [search, setSearch] = useState("");
  const accessToken = useAuth(code);
  const [searchResult, setSearchResult] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(true);

  function chooseTrack(track) {
    setCurrentSong(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if(!accessToken) return;
    spotifyApp.setAccessToken(accessToken);
    setLoading(false);
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApp.searchTracks(search).then(data => {
      if (cancel) return;
      setSearchResult(
        data.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest
        }, track.album.images[0]) 
        return {
          albumUrl: smallestAlbumImage.url,
          artistsName: track.artists[0].name,
          trackName: track.name,
          uri: track.uri,
        }
      }))

      return () => cancel = true;
    })
    .catch(err => console.log(err));
  }, [search, accessToken])

  useEffect(() => {
    if(!currentSong) return;

    axios.get('https://spotify-clone-rest-api.herokuapp.com/lyrics', {
      params: {
        track: currentSong.trackName,
        artist: currentSong.artistsName,
      },
    })
    .then (res => {
      setLyrics(res.data.lyrics);
    })
    .catch(err => {
      console.log(err);
    })
  }, [currentSong])
  return(
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" value={search} onChange={e => setSearch(e.target.value)}/>
      </div> 

      {loading ? 
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh"}}>
          <p style={{ fontSize: "2em" }}><i class="fa fa-spinner fa-spin"></i>  Loading</p>
        </div> : 
        <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
          {searchResult.map(track => (
            <TrackResult track={track} chooseTrack={chooseTrack} key={track.uri} />
          ))}

          {searchResult.length === 0 && 
            <div className="text-center" style={{whiteSpace: "pre"}}>
            {lyrics}
            </div>
          }
        </div> 
      }
      
      
      
      <div>
        <Player accessToken={accessToken} trackUri={currentSong?.uri} />
      </div>
    </Container>
    
  )
}