import React from 'react'
import CodeInput from './CodeInput'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ResetCode() {

  let {resetEmail, codeEntered} = useSelector((data)=>data.user)

  if (resetEmail===null)
    return < Navigate to={'/'}/>

  return (
    <div className='flex flex-col justify-center items-center py-16'>
      <div className='flex justify-center items-center w-[80px] h-[80px] bg-gray-50 rounded-full dark:bg-[#1b1b1b]'>
        <div className='flex justify-center items-center w-[60px] h-[60px] bg-gray-200 rounded-full dark:bg-[#1b1b1b]'>
          <i className='fa-solid fa-envelope text-black text-2xl dark:text-white'></i>
        </div>
      </div>

      <h2 className='text-2xl font-[600]'>Check your email</h2>
      <div className='text-gray-400'>We sent a password reset code to <p className='text-black text-center dark:text-gray-300'>{resetEmail}</p></div>

      <CodeInput></CodeInput>
    </div>
  )
}
