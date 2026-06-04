import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ScrollChrome } from './components/ScrollChrome'
import './index.css'
import './styles/vector-draw.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScrollChrome />
    <App />
  </StrictMode>,
)
