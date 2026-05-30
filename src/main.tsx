import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TopBar from './web/components/TopBar.tsx'
import MainBody from './web/components/MainBody.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <TopBar/>
      <MainBody/>
      {/* <App /> */}
    </div>
  </StrictMode>,
)
