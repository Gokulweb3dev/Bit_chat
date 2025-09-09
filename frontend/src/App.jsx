import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loginpage from './pages/Loginpage'
import Profilepage from './pages/Profilepage'
import Homepage from './pages/Homepage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from './verify/Auth.jsx'

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className='bg-[#161717] text-cyan-50'>
      <Toaster/>
      <Routes>
        
        <Route path='/' element={authUser ? <Homepage/>: <Navigate to="/login" /> } />
        <Route path='/login' element={!authUser ?<Loginpage/>: <Navigate to="/" /> } />
        <Route path='/profile' element={authUser ?<Profilepage/>:<Navigate to="/login" /> }/>
      </Routes>
    </div>
  )
}

export default App   