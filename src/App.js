import React from 'react';
import Register from './Register';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "https://localhost:5174";
  axios.defaults.withCredentials = true;

  return (
    <Register />
  );
}

export default App;
