import React from 'react'

export default function ErrorBoundary() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <i className='fa-solid fa-circle-exclamation text-9xl'></i>
        <h1 className='text-5xl font-bold'>Oops!</h1>
        <h3 className='text-2xl mt-3'>Something went Wrong.</h3>
    </div>
  )
}
