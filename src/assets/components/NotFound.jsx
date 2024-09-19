import React from 'react'
import error from '../images/error.svg'

export default function NotFound() {
  return (
    <div className='w-full flex justify-center items-center py-16 md:py-0'>
      <img src={error} alt="not found page image"/>
    </div>
  )
}
