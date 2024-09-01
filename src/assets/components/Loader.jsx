import React from 'react'

export default function Loader() {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-[90]'>
      <span className="loader"></span>
    </div>
  )
}
