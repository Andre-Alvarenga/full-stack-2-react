import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'; // Importe o componente Routes que configuramos anteriormente
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
