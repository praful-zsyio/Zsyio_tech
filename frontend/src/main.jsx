import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { DataProvider } from './context/DataContext.jsx'
import "../ReactotronConfig.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  </StrictMode>,
)