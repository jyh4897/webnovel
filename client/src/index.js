import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RefreshTokenProvider } from './RefreshTokenContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RefreshTokenProvider>
      <App />
    </RefreshTokenProvider>
  </React.StrictMode>
);


