import React from 'react'
import amazonPayLogo from '../images/Amazon_Pay_logo.svg'
import americanExpressLogo from '../images/american-express-blue-logo.svg'
import masterCardLogo from '../images/Mastercard-logo.svg'
import payPalLogo from '../images/PayPal.svg'
import appStore from '../images/download-on-the-app-store-apple-logo-svgrepo-com.png'
import googlePlay from '../images/google-play-badge-logo-svgrepo-com.png'
import { TextField } from '@mui/material'

export default function Footer() {
  return (
    <div className='bg-custom-gray dark:bg-[#1b1b1b] w-full py-5 text-sm md:text-base'>
      <div className="container">
        <h2 className='text-2xl font-[500]'>Get the FreshCart app</h2>
        <p className='text-gray-500'>We will send you a link, open it on your phone to download the app.</p>
        <div className='w-full flex md:flex-nowrap flex-wrap justify-center items-center gap-x-10 gap-y-3 my-3'>
          <input type="email" className='md:w-3/4 w-full rounded dark:text-black' placeholder='Email ..'/>
          <button className='md:w-1/4 w-full py-2 bg-gray-600 dark:bg-black text-white rounded'>Share App Link</button>
        </div>
        <div className='w-full mt-5'>
          <div className='flex flex-col lg:flex-row justify-between border-t-2 border-b-2 py-5'>
            <div className=' flex md:items-center md:flex-nowrap flex-wrap gap-3'>
              <p className='font-[700] w-full'>Payment Partners</p>
              <img src={amazonPayLogo} width={50} alt="" />
              <img src={americanExpressLogo} width={50} alt="" />
              <img src={masterCardLogo} width={30} alt="" />
              <img src={payPalLogo} width={50} alt="" />
            </div>
            <div className='flex md:items-center md:flex-nowrap flex-wrap gap-3'>
              <p className='font-[700]'>Get deliveries with FreshCart</p>
              <img src={appStore} width={100} className='cursor-pointer' alt="" />
              <img src={googlePlay} width={100} className='cursor-pointer' alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
