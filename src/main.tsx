import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithRouter from './App.tsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);
