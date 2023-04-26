import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

import './index.scss';
import MediaContextProvider from './Context/MediaStore.js';
import AuthContextProvider from './Context/AuthStore.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <MediaContextProvider>
     <App />
  </MediaContextProvider>
  </AuthContextProvider>
);


