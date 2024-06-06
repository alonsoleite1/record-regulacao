import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UsuarioContextProvider } from './provider/UsuarioContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuarioContextProvider>
        <App />
      </UsuarioContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
