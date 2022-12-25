import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./components/styles/style.css";

// http://158.160.14.47:8000
// http://127.0.0.1:8000
// console.log(process.env.REACT_APP_BACKEND_URL);
if (!process.env.REACT_APP_BACKEND_URL) global.BACKEND_URL = "http://127.0.0.1:8000";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
