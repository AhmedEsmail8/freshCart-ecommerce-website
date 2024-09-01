import React from 'react'
import CodeInput from './CodeInput'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ResetCode() {

  let {resetEmail, codeEntered} = useSelector((data)=>data.user)

  if (resetEmail===null)
    return < Navigate to={'/'}/>

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center w-[80px] h-[80px] bg-gray-50 rounded-full'>
        <div className='flex justify-center items-center w-[60px] h-[60px] bg-gray-200 rounded-full'>
          <i className='fa-solid fa-envelope text-black text-2xl'></i>
        </div>
      </div>

      <h2 className='text-2xl font-[600]'>Check your email</h2>
      <div className='text-gray-400'>We sent a password reset code to <p className='text-black text-center'>{resetEmail}</p></div>

      <CodeInput></CodeInput>
    </div>
  )
}
