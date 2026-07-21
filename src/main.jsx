import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import Landing from './Landing.jsx'

function Root() {
  const [entered, setEntered] = useState(false)
  return entered ? <App onBack={() => setEntered(false)} /> : <Landing onEnter={() => setEntered(true)} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
