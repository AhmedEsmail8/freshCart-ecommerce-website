import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { clearCartApi, getCartProductsApi, removeProductFromCartApi, updateProductCartApi } from '../API/cart'
import { isPending } from '@reduxjs/toolkit';
import Loader from './Loader';
import { ref } from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddressModal from './AddressModal';
import cartEmpty from '../images/empty-cart.png'

export default function Cart() {

  let [addressModal, setAddressModal] = useState(false);

  let {data, isLoading, error, isError, refetch} = useQuery({
    queryKey: ['getCartProducts'],
    queryFn: getCartProductsApi,
    gcTime: 0
  })

  function clearCart(){
    clearCartApi()
    .then((data)=>{toast.success('Cart cleared Successfuly!')})
    .then((data)=>{refetch();})
    .catch((error)=>{toast.error('something wrong!')});
  }

  console.log(data?.data?.data);
  if (isLoading)
    return <Loader></Loader>

  if (data?.data?.data?.products?.length == 0){
    return (
      <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex justify-center items-center'>
      <img src={cartEmpty} alt="empty cart image" className='md:w-[400px] w-[250px]'/>
    </div>
    );
  }

  return (
    <div className='py-10'>
      <AddressModal modal={addressModal} setModal={setAddressModal} cartId={data?.data?.data?._id}></AddressModal>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:border-b dark:border-gray-950 dark:bg-[#1b1b1b] dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3 text-center"><span className="sr-only">Image</span></th>
        <th scope="col" className="px-6 py-3 text-center">Product</th>
        <th scope="col" className="px-6 py-3 text-center">Qty</th>
        <th scope="col" className="px-6 py-3 text-center">Price</th>
        <th scope="col" className="px-6 py-3 text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.data?.data?.products?.map((product)=>{
        return <CartProduct product={product} key={product._id} refetch={refetch} refetching={isLoading}></CartProduct>
      })}
      <tr className={`border-b dark:bg-[#1b1b1b] dark:border-gray-950 bg-gray-50 dark:hover:bg-[#262626]`}>
      <td colSpan={5}>
      <div className='text-xl p-4 text-black dark:text-gray-200'><span className='font-bold'>Total price:</span> {data?.data?.data.totalCartPrice}</div>
      </td>
      </tr>
    </tbody>
  </table>
</div>
      <div className='flex flex-wrap mt-5 gap-3 justify-center items-center'>
        <button className='bg-black text-white rounded py-2 px-4' onClick={()=>{setAddressModal(true)}}>Check Out</button>
        <button className='bg-red-700 text-white rounded py-2 px-4' onClick={clearCart}>Clear cart<i className='ml-2 fa-solid fa-trash'></i></button>
      </div>
    </div>
  )
}


function CartProduct({product, refetch, refetching}){

  let [countFlag, setCountFlag] = useState(false);
  let navigate = useNavigate();

  function decreaseCount(){
    if (countFlag)
      return;
    setCountFlag(true);
    if (product.count==1){
      deleteFromCart(product.product._id);
    }
    else{
      updateCartProd({ count: product.count-1, productId: product.product._id });
    }
  }

  function increaseCount(){
    if (countFlag)
      return;
    setCountFlag(true);
    updateCartProd({ count: product.count+1, productId: product.product._id });
  }
  

  let {mutate: deleteFromCart, isPending: deletePending, isSuccess: deleteSuccess}= useMutation({
    mutationKey: ['deleteProductFromCart'],
    mutationFn: removeProductFromCartApi,
    onSuccess: ()=>{
      refetch()
      .then(()=>setCountFlag(false))
      .catch((error)=>console.log(error));
    }
  })

  let {mutate: updateCartProd, isPending: updatePending, isSuccess: updateSuccess}= useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: updateProductCartApi,
    onSuccess: ()=>{
      refetch()
      .then(()=>setCountFlag(false))
      .catch((error)=>console.log(error));
    }
  })

  function handleClick(){
    navigate(`/productdetails/${product.product._id}`)
  }

  return <>
<tr className={`bg-white border-b dark:bg-[#1b1b1b] dark:border-gray-950 hover:bg-gray-50 dark:hover:bg-[#262626]`}>
        <td className="p-4 mx-auto">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full cursor-pointer hover:scale-[1.09] transition-all" alt="Apple Watch" onClick={handleClick}/>
        </td>
        <td className="min-w-[250px] px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
          {product.product.title}
        </td>
        <td className="px-6 py-4 ">
          <div className="flex items-center justify-center">
            <button onClick={decreaseCount} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-[#1b1b1b] dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <div className="flex justify-center items-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-2.5 py-1 dark:bg-[#1b1b1b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                {!countFlag ? product.count :<i className='fa-solid fa-circle-notch fa-spin py-1'></i>}
              </div>
            </div>
            <button onClick={increaseCount} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-[#1b1b1b] dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
          {product.price}EGP
        </td>
        <td className="px-6 py-4 text-center">
          {
            deletePending && !countFlag? <div className="font-medium text-red-600 dark:text-red-500 hover:underline"><i className='fa-solid fa-circle-notch fa-spin'></i></div>
            : <div className="font-medium text-red-600 dark:text-red-500 hover:text-black cursor-pointer" onClick={()=>{deleteFromCart(product.product._id)}}><i className='fa-solid fa-trash-can'></i></div>
          }
        </td>
      </tr>
  </>
}