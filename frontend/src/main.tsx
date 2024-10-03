import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'boxicons/css/boxicons.min.css';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import '@sweetalert2/theme-dark/dark.css'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)