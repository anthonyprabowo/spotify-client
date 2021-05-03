import {useState, useEffect} from 'react';
import axios from 'axios';



export default function useAuth(code) {
  const [accessToken, setAccessToken] =useState();
  const [refreshToken, setRefreshToken] =useState();
  const [expiresIn, setExpiresIn] =useState();

  useEffect(() => {
    axios.post('https://spotify-clone-rest-api.herokuapp.com//login', {
      code
    })
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);

      window.history.pushState({}, document.title, "/");
    })
    .catch(() => {
      window.location = "/"
    })
  }, [code]); // run this useEffect everytime the code change

  useEffect(() => {
    if(!refreshToken || !expiresIn) return // return early if there is no refresh token or expires in
    axios.post('https://spotify-clone-rest-api.herokuapp.com/refresh', {
      refreshToken
    })
    .then(res => {
      setAccessToken(res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
    })
    .catch(() => {
      window.location = "/"
    })
  }, [refreshToken, expiresIn]) // access the refresh API endpoint if the token is about to expires

  return accessToken;
}