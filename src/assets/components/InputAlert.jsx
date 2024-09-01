import React from 'react'

export default function InputAlert({message}) {

    if (message.length==0)
        return <></>

  return (
    <div className='alert border-[1px] border-red-500 rounded p-3 bg-red-200 text-red-600 font-[400]'>
            {message}
    </div>
  )
}
