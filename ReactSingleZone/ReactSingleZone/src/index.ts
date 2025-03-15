// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// כאן את מייבאת את ה-store שלך
import App from './App';
import songStore from './Stores/songStore';

ReactDOM.render(
  <Provider store={songStore}> {/* פה את מחברת את ה-Redux Store */}
    <App />
  </Provider>,
  document.getElementById('root')
);
