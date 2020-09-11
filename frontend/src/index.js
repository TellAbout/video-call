import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App/App.js';
import './index.scss';

const ENDPOINT = 'http://localhost:5000';
axios.defaults.baseURL = ENDPOINT;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
