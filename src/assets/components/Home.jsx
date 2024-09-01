import React from 'react'
import HomeSlider from './HomeSlider'
import banner1 from '../images/slider-2.jpeg'
import banner2 from '../images/grocery-banner-2.jpeg'
import { useQuery } from '@tanstack/react-query'
import CategoriesSlider from './CategoriesSlider'
import { getCategoriesApi } from '../API/categories'
import Loader from './Loader'
import Products from './Products'

export default function Home() {

  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi
  })

  if (isLoading)
    return <Loader></Loader>

  return (
    <div>
      
      <div className="flex flex-wrap h-[50%] overflow-hidden">
        <div className='w-[60%] h-full mb-[-6px]'>
          <HomeSlider></HomeSlider>
        </div>
        <div className='w-[40%] overflow-hidden'>
          <div className='home-images flex flex-col h-full'>
            <div className='flex-grow'>
              <img src={banner1} className='h-full object-cover' alt="" />
            </div>
            <div className='flex-grow'>
              <img src={banner2} className='h-full object-cover' alt="" />
            </div>
          </div>
        </div>
      </div>
      <CategoriesSlider data={data?.data?.data}></CategoriesSlider>
      <div className="home-title mt-16 text-center">
        <h1 className='text-4xl font-bold  uppercase'>products</h1>
      </div>
      <Products></Products>
    </div>
  )
}
