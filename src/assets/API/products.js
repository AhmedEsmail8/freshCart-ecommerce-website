import axios from "axios";

let base = 'https://ecommerce.routemisr.com';

export function getProductsApi({category, page, brand}){
    console.log(category);
    if (category===-1)
      return {};
    
    return axios.get(`${base}/api/v1/products?page=${page}${category?`&category[in]=${category}`:''}${brand?`&brand=${brand}`:''}`)
}


export function getProductIdApi(id){
  return axios.get(`${base}/api/v1/products/${id}`)
}