import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getProductsApi } from '../API/products'
import Loader from './Loader'
import Product from './Product'
import { useNavigate, useParams } from 'react-router-dom'
import { getWishlistProductsApi } from '../API/wishlist'
import { InputAdornment, Pagination, Skeleton, TextField } from '@mui/material'
import noProductsFound from '../images/no-product-found.png'
import ProductsFilter from './ProductsFilter'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilter, toggleFilterOpen } from '../lib/slices/ProductsFilterSlice'

export default function Products() {
  let params = useParams();
  const [page, setPage] = React.useState(1);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let filter = useSelector((data) => data.productsFilter);
  let queryClient = useQueryClient();
  let [keyWord, setKeyWord] = useState('');
  let [filterClicked, setFilterClicked] = useState(false);


  useEffect(()=>{
    return ()=>{
      dispatch(resetFilter());
    }
  }, []);


  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
    setFilterClicked(false);
  };

  // filter?.categories?.length > 0 || filter?.brands?.length > 0 || filter?.price[0] != 0 || filter?.price[1] != 30000 

  let { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['products', page, filter.brands, filter.price[0], filter.price[1], filter.categories, params.category, params.brand, keyWord],
    queryFn: () => getProductsApi({category: getCategories(), brand: getBrands(), page: (filterClicked? '': page), price: filter.price, keyWord }),
    gcTime: 0,
    cacheTime: 0
  });

  function getCategories() {
    if (params.category && params.category != -1) {
      return [params.category];
    }
    if (filter.categories.length > 0)
      return filter.categories;
    return [];
  }

  function getBrands() {
    if (params.brand && params.brand != -1){
      return [params.brand];
    }
    if (filter.brands.length > 0)
      return filter.brands;
    return [];
  }


  if (isError)
    navigate('/home');

  let { data: wishlistProducts, isLoading: productsLoading, isError: productsIsError, error: productsError, refetch: refetchFav } = useQuery({
    queryKey: ['getWishlistProducts'],
    queryFn: getWishlistProductsApi
  })


  if (isLoading || productsLoading) {
    return (
      <>
        <div className='flex flex-wrap'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='sm:w-1/2 md:w-1/3 xl:w-1/5 w-full p-3'>
              <Skeleton variant="rectangular" animation="wave" className='w-full mb-2 dark:bg-[#27272793]' height={300} />
              <Skeleton variant="rectangular" animation="wave" className='w-full mb-2 dark:bg-[#27272793]' height={10} />
              <Skeleton variant="rounded" animation="wave" className='w-full mb-2 dark:bg-[#27272793]' height={20} />
              <Skeleton variant="rounded" animation="wave" className='w-full dark:bg-[#27272793]' height={20} />
            </div>
          ))}
        </div>
      </>
    )
  }

  if (isError) return <div>Error loading products: {error.message}</div>

  // console.log(data?.data?.metadata?.numberOfPages);

  if (data?.data?.data?.length === 0) {
    return (
      <>
        <div className='w-fit flex items-center cursor-pointer my-3' onClick={() => { dispatch(toggleFilterOpen()) }}>
          <i className="fa-solid fa-filter"></i>
          <p className='text-gray-600'>Filter</p>
        </div>
        <div className='py-16 w-full flex justify-center items-center'>
          <img src={noProductsFound} alt="no products found image" className='md:w-[200px] w-[150px]' />
        </div>
      </>
    );
  }


  return (
    <div className='py-10'>
      <div className='flex'>
        {(params.category && params.category != -1) || (params.brand && params.brand != -1) ? '' : <ProductsFilter setFilterClicked={setFilterClicked} setPage={setPage}></ProductsFilter>}
      
      {/* <TextField
              type="text"
              id="keyWord"
              name="keyWord"
              size='small'
              sx={{'input':{'padding': '10px'}}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-solid fa-magnifying-glass'></i>
                    </InputAdornment>
                  )
                },
                
              }}
              onChange={(e)=>{setKeyWord(e.target.value);}}
            /> */}
      </div>
      {(params.category && params.category != -1) || (params.brand && params.brand != -1) ? '' : (
        <div className='w-fit flex items-center cursor-pointer my-3' onClick={() => { dispatch(toggleFilterOpen()) }}>
        <i className="fa-solid fa-filter"></i>
        <p className='text-gray-600'>Filter</p>
      </div>
      )}
      
      <div className='flex flex-wrap'>
        {data?.data?.data?.map((product) => (
          <Product key={product._id} product={product} favProducts={wishlistProducts?.data?.data} refetchFav={refetchFav} />
        ))}
      </div>
      <div className='flex justify-center my-5'>
        <Pagination count={data?.data?.metadata?.numberOfPages}
          page={page} onChange={handleChange} />
      </div>
    </div>
  )
}
