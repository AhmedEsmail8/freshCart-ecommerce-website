import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Layout() {
  let { theme } = useSelector(data => data.theme);

  return (
    <>
      <ToastContainer theme={theme}></ToastContainer>
      <Nav />
      <div className='flex flex-col min-h-[100vh]'>
        <div className='flex-grow container flex flex-col justify-center'>
          <Outlet className="flex-grow" />
        </div>
        <Footer />
      </div>
    </>
  );
}
