import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { addProductToCartApi } from '../API/cart';
import { toast } from 'react-toastify';
import { addProdToWishlistApi, removeProdFromWishlistApi } from '../API/wishlist';
import { useNavigate } from 'react-router-dom';

export default function Product({product, favProducts, refetchFav, hideOnUnFav}) {  

  let [fav, setFav] = useState(false);
  let queryClient = useQueryClient();
  
  let [visible, setVisible] = useState('');
  

  let {mutate, data, isPending} = useMutation({
    mutationKey: ['addProductToCart'],
    mutationFn: addProductToCartApi,
    onSuccess: ()=>{
      toast.success("Product added successfuly!");
    }
  })

  let {mutate: favProd, data: favProdData, isPending: favProdPending} = useMutation({
    mutationKey: ['addProductToWishlist'],
    mutationFn: addProdToWishlistApi,
    onError: ()=>{
      setFav(false);
    },
    onSuccess: ()=>{
      toast.success("Product added to your wishlist successfuly!");
    }
  })

  let {mutate: unFavProd, data: unFavProdData, isPending: unFavProdPending, isSuccess: unFavProdSuccess} = useMutation({
    mutationKey: ['addProductToWishlist'],
    mutationFn: removeProdFromWishlistApi,
    onError: ()=>{
      setFav(true);
      setVisible('');
    },
    onSuccess: ()=>{
      setFav(false);
      toast.success("Product removed from your wishlist successfuly!");
    }
  })

  function addProdToWishlist(){
    favProd(product._id);
    setFav(true);
  }

  function removeProdFromWishlist(){
    unFavProd(product._id);
    setFav(false);
    if (hideOnUnFav){
      setVisible('hidden');
    }
  }

  function handleFavProd(){
    if (fav){
      removeProdFromWishlist();
    }
    else{
      addProdToWishlist();
    }
    refetchFav().then((favs)=>{
      console.log('refetch');
      
      for (let i=0; i<favs?.data?.data?.data?.length; i++){
        if (favs?.data?.data?.data[i]?._id === product._id){
          setFav(true);
          break;
        }
      }
    })
    
    
  }

  useEffect(() => {    
    for (let i = 0; i < favProducts?.length; i++) {
      if (favProducts[i]._id === product._id) {
        setFav(true);
        break;
      }
    }
  }, [favProducts, product._id]);

  let navigate = useNavigate();

  function handleClick(){
    navigate(`/productdetails/${product._id}`)
  }

  
  

  return (
    <div className={`${visible} product-card sm:w-1/2 md:w-1/3 xl:w-1/5 p-3 flex cursor-pointer relative ${visible}`}>
      
          <div className='w-full'>
            <div className='relative overflow-hidden'>
              <img src={product.imageCover} alt="product image cover" className='product-image w-full object-cover h-full scale-110'/>
              {fav?<i className={`fa-solid text-red-700 fa-heart absolute top-[20px] left-[20px] text-xl z-[11]`} onClick={handleFavProd}></i>:''}
              <div className='product-overlay absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10'>
                {
                  isPending?<div className='absolute left-1/2 translate-x-[-50%] translate-y-[-50%] product-overlay-btns'>
                  <div onClick={handleClick} className='relative bg-white text-black w-[150px] h-[40px] mb-2 rounded-[50vh] overflow-hidden product-overlay-button'>
                      <div className='w-full h-full'>
                          <p className='w-full h-full text-center'>View</p>
                          <i className="fa-regular fa-eye text-center w-full h-full text-white"></i>
                      </div>
                  </div>
                  <div onClick={()=>{mutate(product._id)}} className='relative bg-black w-[150px] h-[40px] mb-2 rounded-[50vh] overflow-hidden'>
                      <div className='w-full h-full flex justify-center items-center'>
                          <i className="fa-solid fa-circle-notch fa-spin text-center text-white"></i>
                      </div>
                  </div>
              </div>
                  :<div className='absolute left-1/2 translate-x-[-50%] translate-y-[-50%] product-overlay-btns'>
                  <div onClick={handleClick} className='relative bg-white text-black w-[150px] h-[40px] mb-2 rounded-[50vh] overflow-hidden product-overlay-button'>
                      <div className='w-full h-full'>
                          <p className='w-full h-full text-center'>View</p>
                          <i className="fa-regular fa-eye text-center w-full h-full text-white"></i>
                      </div>
                  </div>
                  <div onClick={()=>{mutate(product._id)}} className='relative bg-white text-black w-[150px] h-[40px] mb-2 rounded-[50vh] overflow-hidden product-overlay-button'>
                      <div className='w-full h-full'>
                          <p className='w-full h-full text-center'>Add to cart</p>
                          <i className="fa-solid fa-cart-shopping text-center w-full h-full text-white"></i>
                      </div>
                  </div>
              </div>
                }
                <i className={`${!fav?'fa-regular text-white':'fa-solid text-red-700 hidden'} fav-icon fa-heart absolute top-[20px]  text-xl`} onClick={handleFavProd}></i>
              </div>
            </div>
            <h3 className='text-gray-500 dark:text-gray-400 mb-3'>{product.category?.name}</h3>
            <h3 className='font-bold'>{product.title}</h3>
            <div className='flex justify-between'>
              <p className="price text-gray-600 dark:text-gray-400">{`${product.price}EGP`}</p>
              <div className='flex justify-center items-center'>
                <i className='fa fa-star rating-color mr-1'></i>
                <p>{product.ratingsAverage}</p>
              </div>
            </div>
          </div>
        </div>
  )
}
