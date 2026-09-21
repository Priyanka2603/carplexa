import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import Sidebar from '../Layout/Sidebar'

function MainLayout() {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <Outlet />
    <Footer/>
    
    </>
  )
}

export default MainLayout