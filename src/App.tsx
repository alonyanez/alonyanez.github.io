import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import TareaForm from './pages/TareaForm'
import { ProjectDetails } from '@/pages/projects'
import { authService } from './services/authService'
import { JSX } from 'react'

function PrivateRoute({ children }: { children: JSX.Element }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/projects/:slug' element={<ProjectDetails />} />

      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path='/tareas/nueva' element={
        <PrivateRoute>
          <TareaForm />
        </PrivateRoute>
      } />

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App