import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (
    <>
    <ToastContainer></ToastContainer>
      <Nav />
      <div className='flex flex-col min-h-[100vh]'>
        <div className='flex-grow container relative'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
