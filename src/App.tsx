import './App.css'

import { Routes, Route } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import Layout from "./components/Layout";

function App() {

  return (
    <Routes>
      <Route path="/login" Component={LoginPage}/>
      <Route path="/register" Component={RegisterPage}/>
      <Route path="/" Component={Layout}>
        <Route path="home" Component={HomePage}/>
      </Route>
    </Routes>
  )
}

export default App
