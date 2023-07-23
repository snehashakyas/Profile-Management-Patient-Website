import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'


function App() {
  return (
    <>
    <Router>
    <div>
      <Routes>
        <Route path='/users' element={<Signup />} />
        <Route path='/users/signin' element={<Signin />} />
        <Route path='/users/me' element={<Dashboard />} />
        <Route path='*' element={<Signin/>} />
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
