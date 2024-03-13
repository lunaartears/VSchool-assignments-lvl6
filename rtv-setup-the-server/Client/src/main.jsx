import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {UserProvider} from './context/UserProvider.jsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>

)
