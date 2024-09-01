import axios from "axios";

let base = 'https://ecommerce.routemisr.com';

export function getWishlistProductsApi(){
    let token = localStorage.getItem('freshCartToken');
    return axios.get(`${base}/api/v1/wishlist`, {headers: {token}})
}

export function addProdToWishlistApi(productId){
    let token = localStorage.getItem('freshCartToken');
    return axios.post(`${base}/api/v1/wishlist`, {productId}, {headers: {token}})
}

export function removeProdFromWishlistApi(productId){
    let token = localStorage.getItem('freshCartToken');
    return axios.delete(`${base}/api/v1/wishlist/${productId}`, {headers: {token}})
}