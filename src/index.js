// index.jsx
import React from 'react';
import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


