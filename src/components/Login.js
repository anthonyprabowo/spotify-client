import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f016625a8e2e4936a3cb2761f9b4f1ef&response_type=code&redirect_uri=https://master.d1255o3gz224xt.amplifyapp.com/&scope=streaming%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <a href={AUTH_URL} className="btn btn-success btn-lg">Login with spotify</a>
    </Container>
    
  );
}

export default Login;
