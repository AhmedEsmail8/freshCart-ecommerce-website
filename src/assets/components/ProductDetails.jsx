import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductIdApi, getProductsApi } from '../API/products';
import ProductImagesSlider from './ProductImagesSlider';
import Loader from './Loader';
import { addProductToCartApi } from '../API/cart';
import { toast } from 'react-toastify';
import { addProdToWishlistApi, getWishlistProductsApi, removeProdFromWishlistApi } from '../API/wishlist';
import Slider from 'react-slick';
import Product from './Product';
import { Skeleton } from '@mui/material';

export default function ProductDetails() {
    let params = useParams();
    let [fav, setFav] = useState(false);
    
    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['getProductById', params.id],
        queryFn: () => getProductIdApi(params.id)
    });
    

    let { data: products, isLoading: productsLoading, error: productsError, isError: productsIsError} = useQuery({
        queryKey: ['products',data?.data?.data?.category?._id],
        queryFn: () => getProductsApi({ category: data?.data?.data?.category?._id || -1}),
        gcTime: 0
    });

    console.log(products?.data?.data);
    

    let { mutate: addToCart , isPending: cartPending} = useMutation({
        mutationKey: ['addProductToCart', params.id],
        mutationFn: addProductToCartApi,
        onSuccess: () => {
          toast.success("Product added successfully!");
        }
    });

    let { data: wishlistProducts, isLoading: favProductsLoading} = useQuery({
        queryKey: ['getWishlistProducts'],
        queryFn: getWishlistProductsApi
    });

    let { mutate: favProd } = useMutation({
        mutationKey: ['addProductToWishlist'],
        mutationFn: addProdToWishlistApi,
        onError: () => {
          setFav(false);
        },
        onSuccess: () => {
          toast.success("Product added to your wishlist successfully!");
        }
    });
    
    let { mutate: unFavProd } = useMutation({
        mutationKey: ['removeProductFromWishlist'],
        mutationFn: removeProdFromWishlistApi,
        onError: () => {
          setFav(true);
        },
        onSuccess: () => {
          toast.success("Product removed from your wishlist successfully!");
        }
    });

    useEffect(() => {
        if (wishlistProducts && data) {
            let favProducts = wishlistProducts?.data?.data;
            let found = favProducts?.some(product => product._id === data?.data?.data?._id);
            
            if (found !== fav) {
                setFav(found);
            }
        }
    }, [wishlistProducts, data]);

    function addProdToWishlist() {
        setFav(true);
        favProd(data?.data?.data?._id);
    }
    
    function removeProdFromWishlist() {
        setFav(false);
        unFavProd(data?.data?.data?._id);
    }
    
    function handleFavProd() {
        if (fav) {
          removeProdFromWishlist();
        } else {
          addProdToWishlist();
        }

    }

    function addToCartClick() {
        addToCart(params.id);
    }

    if (isLoading || favProductsLoading || productsLoading){
        return (
            <div className='py-10'>
            <div className='flex flex-wrap'>
                <div className='md:w-1/2 xl:w-1/4 md:mb-0 w-full mb-12'>
                <Skeleton variant="rectangular" animation="wave" className='w-full mb-2' height={350}/>
                <div className='flex w-full justify-center items-center gap-3'>
                    <Skeleton variant="rectangular" animation="wave" width={40} height={50}/>
                    <Skeleton variant="rectangular" animation="wave" width={40} height={50}/>
                    <Skeleton variant="rectangular" animation="wave" width={40} height={50}/>
                </div>
                </div>
                <div className='md:w-1/2 xl:w-3/4 w-full flex flex-col justify-center md:px-5'>
                <Skeleton variant="rounded" animation="wave" className='w-full mb-2' height={50}/>
                <Skeleton variant="text" animation="wave" className='w-full mb-2'/>
                <Skeleton variant="text" animation="wave" className='w-full mb-2'/>
                <Skeleton variant="rounded" animation="wave" className='w-full md:w-3/4 block mx-auto mt-3' height={40}/>
                </div>
            </div>
        </div>
        )
    }
    
    return (
        <div className='py-10'>
            <div className='flex flex-wrap'>
                <div className='md:w-1/2 xl:w-1/4 md:mb-0 w-full mb-12'>
                    <ProductImagesSlider images={data?.data?.data?.images}></ProductImagesSlider>
                </div>
                <div className='md:w-1/2 xl:w-3/4 w-full flex flex-col justify-center md:px-5'>
                    <div className='flex justify-between  mb-2'>
                        <h3 className='text-3xl font-bold w-[calc(100%-20px)]'>{data?.data?.data?.title}</h3>
                        <i className={`fa-solid fa-heart text-xl cursor-pointer w-[20px] ${fav ? 'text-red-700' : ''}`} onClick={handleFavProd}></i>
                    </div>
                    <p className='text-gray-600'>{data?.data?.data?.description}</p>
                    <div className='flex justify-between items-center mt-5'>
                        <p>{data?.data?.data?.price}EGP</p>
                        <div>
                            <i className='fa-solid fa-star rating-color mr-1'></i>
                            <span>{data?.data?.data?.ratingsAverage}</span>
                        </div>
                    </div>
                    <button className='bg-black text-white py-2 rounded w-full md:w-3/4 block mx-auto mt-3' onClick={addToCartClick}>{cartPending?
                    <i className='fa-solid fa-circle-notch fa-spin text-white'></i>:'+Add'}</button>
                </div>
            </div>
            <h3 className='mt-16 text-xl font-bold'>Related products</h3>
            <ProductsSlider data={products?.data?.data} favProducts={wishlistProducts}></ProductsSlider>
        </div>
    );
}

function ProductsSlider({data, favProducts}){
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 1 ,
            }
          },
          {
            breakpoint: 600,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 1 ,
            }
          },
          {
            breakpoint: 480,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1 ,
            }
          }
        ]
      };
      
      return (
        <div className="mb-7">
          <Slider {...settings}>
          {data?.map((product)=>(
            <ProductItem key={product._id} product={product} favProducts={favProducts}></ProductItem>
          )
          )}
        </Slider>
        </div>
      );
}


function ProductItem({product, favProducts}) {  

    let fav = useRef(false);
    
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
        fav.current = false;
      },
      onSuccess: ()=>{
        toast.success("Product added to your wishlist successfuly!");
      }
    })
  
    let {mutate: unFavProd, data: unFavProdData, isPending: unFavProdPending, isSuccess: unFavProdSuccess} = useMutation({
      mutationKey: ['addProductToWishlist'],
      mutationFn: removeProdFromWishlistApi,
      onError: ()=>{
        fav.current = true;
        setVisible('');
      },
      onSuccess: ()=>{
        fav.current = false;
        toast.success("Product removed from your wishlist successfuly!");
      }
    })
  
    function addProdToWishlist(){
      favProd(product._id);
      fav.current = true;
    }
  
    function removeProdFromWishlist(){
      unFavProd(product._id);
      fav.current = false;
    }
  
    function handleFavProd(){
      if (fav.current){
        removeProdFromWishlist();
      }
      else{
        addProdToWishlist();
      }
    }
    
  
    for (let i=0; i<favProducts?.length; i++){
      if (favProducts[i]._id === product._id){
        fav.current = true;
        break;
      }
    }
  
    let navigate = useNavigate();
  
    function handleClick(){
      navigate(`/productdetails/${product._id}`)
    }
    
  
    return (
      <div className={`product-card p-3 flex cursor-pointer relative ${visible}`}>
        
            <div className='w-full'>
              <div className='relative overflow-hidden'>
                <img src={product.imageCover} alt="product image cover" className='product-image w-full object-cover h-full'/>
                {fav.current?<i className={`fa-solid text-red-700 fa-heart absolute top-[20px] left-[20px] text-xl z-[11]`} onClick={handleFavProd}></i>:''}
                <div className='product-overlay absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10'>
                  <div className='absolute left-1/2 translate-x-[-50%] translate-y-[-50%] product-overlay-btns'>
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
                  <i className={`${!fav.current?'fa-regular text-white':'fa-solid text-red-700 hidden'} fav-icon fa-heart absolute top-[20px]  text-xl`} onClick={handleFavProd}></i>
                </div>
              </div>
              <h3 className='text-gray-500 mb-3'>{product.category?.name}</h3>
              <h3 className='font-bold'>{product.title}</h3>
              <div className='flex justify-between'>
                <p className="price text-gray-600">{`${product.price}EGP`}</p>
                <div className='flex justify-center items-center'>
                  <i className='fa fa-star rating-color mr-1'></i>
                  <p>{product.ratingsAverage}</p>
                </div>
              </div>
            </div>
          </div>
    )
  }