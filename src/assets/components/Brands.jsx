import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBrandsApi } from '../API/brands'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

export default function Brands() {

  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['brands'],
    queryFn: getBrandsApi
  })

  let navigate = useNavigate();

  console.log(data?.data?.data);
  

  if (isLoading)
    return <Loader></Loader>

  function handleClick(id) {
    navigate(`/products/-1/${id}`)
  }

  return (
    <div className='flex flex-wrap justify-center items-center py-10'>
      {data?.data?.data?.map((brand)=>
      <div className='lg:w-1/4 sm:w-1/2 p-2 hover:scale-[1.025] cursor-pointer transition' key={brand._id} onClick={()=>{handleClick(brand._id)}}>
        <div className='border-2 border-black dark:border-none rounded flex justify-center items-center'>
          <img src={brand.image} alt="" />
        </div>
      </div>)}
    </div>
  )
}
