//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ProjectDetails } from '@/pages/projects'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import { authService } from './services/authService'
import { JSX } from 'react'

function PrivateRoute({ children }: { children: JSX.Element }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />
}


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Navigate to='/dashboard' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path='/projects/:slug' element={<ProjectDetails />} />
      <Route path='*' element={'404 - Page not found'} />
    </Routes>
  )
}

export default App
