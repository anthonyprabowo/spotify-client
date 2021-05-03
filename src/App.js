import React from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const params = new URLSearchParams(window.location.search);
const code = params.get('code');


function App() {
  return (
    code ? <MainPage code={code} /> : <Login />
  );
}

export default App;
