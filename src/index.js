import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ShowProductsApp from './ShowProductsApp';


 
const root = ReactDOM.createRoot(document.getElementById('root'));

// Check if URL contains 'show-products'
const url = window.location.href;

if (url.includes('show-products')) {
  root.render(<ShowProductsApp />);
} else {
  root.render(<App />);
}
