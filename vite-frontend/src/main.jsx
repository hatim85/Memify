import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChopinContextProvider } from "@chopinframework/react"
import { useAddress } from '@chopinframework/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChopinContextProvider>
      <App />
    </ChopinContextProvider>
  </StrictMode>,
)
