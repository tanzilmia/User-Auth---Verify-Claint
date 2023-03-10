import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authcontext from './contextApi/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Authcontext> <App /> </Authcontext>
  
);

reportWebVitals();
