import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <Routes>
      <Route path="/home" Component={LoginPage}/>
      <Route path="/" Component={RegisterPage}/>
    </Routes>
  )
}

export default App
