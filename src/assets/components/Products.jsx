import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getProductsApi } from '../API/products'
import Loader from './Loader'
import Product from './Product'
import { useNavigate, useParams } from 'react-router-dom'
import { getWishlistProductsApi } from '../API/wishlist'
import { Pagination, Skeleton } from '@mui/material'
import noProductsFound from '../images/no-product-found.png'

export default function Products() {

  let params = useParams();
  const [page, setPage] = React.useState(1);
  let navigate = useNavigate();

  const handleChange = (event, value) => {
    setPage(value);
  };
  
  let { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProductsApi({ category: params.category && params.category!=-1?params.category:'',brand: params.brand && params.brand!=-1?params.brand:''  , page}),
    gcTime: 0,
    cacheTime: 0
  });

  if (isError)
    navigate('/home');

  let {data: wishlistProducts, isLoading: productsLoading, isError: productsIsError, error: productsError, refetch: refetchFav} = useQuery({
    queryKey: ['getWishlistProducts'],
    queryFn: getWishlistProductsApi
  })
  
  
  if (isLoading || productsLoading){
    return (
      <>
        <div className='flex flex-wrap'>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className='sm:w-1/2 md:w-1/3 xl:w-1/5 w-full p-3'>
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

  if (isError) return <div>Error loading products: {error.message}</div> 

  console.log(data?.data?.metadata?.numberOfPages);

  if (data?.data?.data?.length === 0){
    return (
      <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex justify-center items-center'>
      <img src={noProductsFound} alt="no products found image" className='md:w-[200px] w-[150px]'/>
    </div>
    );
  }
  

  return (
    <>
    <div className='flex flex-wrap'>
      {data?.data?.data?.map((product) => (
        <Product key={product._id} product={product} favProducts={wishlistProducts?.data?.data} refetchFav={refetchFav}/>
      ))}
    </div>
    <div className='flex justify-center my-5'>
      <Pagination count={data?.data?.metadata?.numberOfPages}
        page={page} onChange={handleChange} />
    </div>
    </>
  )
}
