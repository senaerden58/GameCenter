import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.js';


// React 18'de, root elementini createRoot ile başlatıyoruz
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
