import React from 'react'
import error from '../images/error.svg'

export default function NotFound() {
  return (
    <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex justify-center items-center'>
      <img src={error} alt="not found page image"/>
    </div>
  )
}
