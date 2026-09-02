import React from 'react'
import Navbar from './components/Navbar'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Problems from './pages/Problems'
import Goals from './pages/Goals'
import Projects from './pages/Projects'
import Resources from './pages/Resources'
import Notes from './pages/Notes'
import Profile from './pages/Profile'


function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/goals" element={<Goals />} />
        <Route path='/projects' element={< Projects/>} />
        <Route path='/resources' element={< Resources/>} />
        <Route path='/notes' element={< Notes />} />
        <Route path='/profile' element={< Profile />} />
      </Routes>
      
    </>
  )
}

export default App