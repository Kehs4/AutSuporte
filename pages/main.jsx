import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Home from './home/home'
import AppRoutes from './routes'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

