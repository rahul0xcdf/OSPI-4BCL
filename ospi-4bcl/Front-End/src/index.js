import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './styles/global.css';
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import App from './components/App';
import UpdatePswrd from './components/Dashboard/UpdatePswrd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode> 
   
  
);

