import {BrowserRouter as Router, Routes, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import PatientEdit from './pages/PatientEdit'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {  

  const isLoggedIn = !!localStorage.getItem('jwtToken');
 
  return (
    <>
    <Router>
    <div>
      <Routes>
        <Route path='/users' element={<Signup />} />
        <Route path='/users/signin' element={<Signin />} />
        <Route path='/users/me' element={<Dashboard />} />
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <Signin />} />
        <Route path='*' element={isLoggedIn ? <Dashboard /> : <Signin />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
