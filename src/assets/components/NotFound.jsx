import React from 'react'
import error from '../images/error.svg'

export default function NotFound() {
  return (
    <div className='w-full flex justify-center items-center'>
      <img src={error} alt="not found page image"/>
    </div>
  )
}
