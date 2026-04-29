import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 🧠 Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// 🔔 Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🌐 Router ADD THIS
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>

      <BrowserRouter>
        <App />
      </BrowserRouter>

      {/* 🔔 Toast globally */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

    </Provider>

  </StrictMode>
);