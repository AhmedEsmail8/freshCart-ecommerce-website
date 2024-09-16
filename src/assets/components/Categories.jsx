import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getCategoriesApi } from '../API/categories'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

export default function Categories() {
  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi
  })

  let navigate = useNavigate();
  let queryClient = useQueryClient();

  if (isLoading)
    return <Loader></Loader>

  console.log(data?.data?.data);

  function handleClick(id){
    navigate(`/products/${id}/-1`);
  }
  
  return (
    <div className='flex flex-wrap lg:justify-start justify-center items-center py-10'>
      {data?.data?.data?.map((category)=><div className='xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full p-3 ' key={category._id} onClick={()=>{handleClick(category._id)}}>
        <div className='rounded overflow-hidden border-2 dark:border-gray-800 cursor-pointer hover:shadow-lg dark:hover:shadow-md dark:hover:scale-105 dark:hover:shadow-gray-800 transition'>
          <img src={category.image} alt="" className='h-[350px] w-full object-cover' />
          <h2 className='text-center text-2xl py-4 font-bold'>{category.name}</h2>
        </div>
      </div>)}
    </div>
  )
}
