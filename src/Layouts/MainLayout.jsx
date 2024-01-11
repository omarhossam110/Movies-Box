import React from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function MainLayout({userToken, logOut}) {
  return (
    <>
      <NavBar />
         
         {/* The pages you want to represent will automatically replace this <Outlet></Outlet> Component */}
         <Outlet></Outlet>

      <Footer/>
    </>
  )
}
