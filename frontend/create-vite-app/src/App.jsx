import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './Components/MainLayout'
import Dashboard from './Components/Dashboard'
import Users from './Components/users'

function App() {
  return (
    <>

      {/* <Navbar />
      <Main />
      <Sidebar />
      <Footer /> */}

      <Routes>
        <Route path="" element={<MainLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
        </Route>
      </Routes>


    </>
  )
}

export default App