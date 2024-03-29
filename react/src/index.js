import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className='bg-light py-5'>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
