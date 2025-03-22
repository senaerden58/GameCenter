import React from 'react';
import ReactDOM from 'react-dom/client'; // react-dom/client import edilmesi gerekiyor
import App from './App';

// React 18'de, root elementini createRoot ile başlatıyoruz
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
