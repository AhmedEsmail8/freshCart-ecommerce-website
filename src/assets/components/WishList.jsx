import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getWishlistProductsApi } from '../API/wishlist'
import Product from './Product'
import Loader from './Loader'
import { Skeleton } from '@mui/material'

export default function WishList() {

  let { data: wishlistProducts, isLoading: productsLoading, isError: productsIsError, error: productsError, refetch } = useQuery({
    queryKey: ['getWishlistProducts'],
    queryFn: getWishlistProductsApi,
    refetchInterval: 1000
  })

  if (productsLoading){
    return (
      <>
        <div className='flex flex-wrap'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className='sm:w-1/2 md:w-1/3 xl:w-1/5 p-3'>
          <Skeleton variant="rectangular" animation="wave" className='w-full mb-2' height={300}/>
          <Skeleton variant="rectangular" animation="wave" className='w-full mb-2' height={10} />
          <Skeleton variant="rounded" animation="wave" className='w-full mb-2' height={20} />
          <Skeleton variant="rounded" animation="wave" className='w-full' height={20} />
        </div>
      ))}
    </div>
      </>
    )
  }

  if (wishlistProducts?.data?.data?.length == 0) {
    return (
      <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col justify-center items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" className='w-[150px] text-gray-200 fill-current' viewBox="0 0 576 512"><path d="M298.7 97.64L257 143.7L213.5 97.91C173.6 57.42 110 52.6 70.71 86.82L70.53 86.97C21.8 128.7 19.4 203.3 62.71 248.2L62.73 248.2L256.4 447.9C256.5 447.9 256.6 447.8 256.7 447.7L269.1 434.8C273.4 445.3 278.7 455.3 284.9 464.6L279.4 470.3C266.4 483.2 245.5 483.2 233.5 470.3L39.71 270.5C-16.22 212.5-13.23 116.6 49.7 62.68C102.8 16.41 184.1 24.47 234.3 73.46C235 74.19 235.7 74.92 236.5 75.67L256.4 96.64L275.4 75.67C276.3 74.76 277.2 73.87 278.1 72.99C328.3 24.42 408.3 16.56 463.2 62.68C506.1 100.1 520.7 157.6 507 208.7C497.4 204.2 487.3 200.5 476.8 197.8C486.3 158.8 474.8 115.3 442.4 87C400.9 52.33 338.2 57.7 298.7 97.64V97.64zM454.6 368L491.3 404.7C497.6 410.9 497.6 421.1 491.3 427.3C485.1 433.6 474.9 433.6 468.7 427.3L432 390.6L395.3 427.3C389.1 433.6 378.9 433.6 372.7 427.3C366.4 421.1 366.4 410.9 372.7 404.7L409.4 368L372.7 331.3C366.4 325.1 366.4 314.9 372.7 308.7C378.9 302.4 389.1 302.4 395.3 308.7L432 345.4L468.7 308.7C474.9 302.4 485.1 302.4 491.3 308.7C497.6 314.9 497.6 325.1 491.3 331.3L454.6 368zM576 368C576 447.5 511.5 512 432 512C352.5 512 288 447.5 288 368C288 288.5 352.5 224 432 224C511.5 224 576 288.5 576 368zM432 256C370.1 256 320 306.1 320 368C320 429.9 370.1 480 432 480C493.9 480 544 429.9 544 368C544 306.1 493.9 256 432 256z"></path></svg>
      <h3 className='text-3xl font-bold mt-2'>Wishlist is empty.</h3>
      <p className='text-center mt-3 text-gray-500'>You don't have any products in the wishlist yet.<br></br>
      You will find a lot of interesting products on our "products" page.</p>
    </div>
    );
    
  }

  return (
    <div className='py-10'>
      <div className='flex flex-wrap'>
        {wishlistProducts?.data?.data?.map((product) => {
          return <Product key={product._id} product={product} favProducts={wishlistProducts?.data?.data} refetchFav={refetch} hideOnUnFav={true}></Product>
        })}
      </div>
    </div>
  )
}
