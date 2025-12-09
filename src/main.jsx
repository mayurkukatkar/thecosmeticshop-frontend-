import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set base URL for Axios
// If VITE_API_URL is set (in production), use it.
// Otherwise, fall back to relative path which uses Vite proxy in dev.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
