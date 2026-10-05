import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './Components/MainLayout'
import Dashboard from './Components/Dashboard'
import Users from './Components/users'
import Profile from "./Components/profile"
import Login from "./Components/login"
import SignUp from './Components/SignUp'
import ProtectedRoute from './Components/ProtectedRoute'
import Cars from './Components/Cars'

function App() {
  return (
    <>

      {/* <Navbar />
      <Main />
      <Sidebar />
      <Footer /> */}
      

      <Routes>
        <Route path="/" element={<SignUp/>}></Route>

        <Route path="/login" element={<Login/>}></Route>
        <Route path="" element={<MainLayout/>}>
          <Route path="/dashboard"element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/cars" element={<Cars/>}></Route>

          
        </Route>
      </Routes>


    </>
  )
}

export default App