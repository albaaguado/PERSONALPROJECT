import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain = "albaaguado.eu.auth0.com"
    clientId = "nHktdBMAmrVbMnFBc7IXkdXyY3Z61dih"
    redirectUri = {window.location.origin}>
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
