import axios from "axios"

let base = 'https://ecommerce.routemisr.com'



export function addProductToCartApi(id){
    let token = localStorage.getItem('freshCartToken')
    return axios.post(`${base}/api/v1/cart`, {productId: id}, {headers: {token}})
}

export function getCartProductsApi(){
    let token = localStorage.getItem('freshCartToken')
    return axios.get(`${base}/api/v1/cart`, {headers: {token}})
}

export function removeProductFromCartApi(productId){   
    let token = localStorage.getItem('freshCartToken')
    return axios.delete(`${base}/api/v1/cart/${productId}`, {headers: {token}})
}

export function updateProductCartApi({count, productId}){
    let token = localStorage.getItem('freshCartToken')
    console.log(count);
    
    if (count<1)
        return removeProductFromCartApi(productId);
    return axios.put(`${base}/api/v1/cart/${productId}`, {count}, {headers: {token}})
}

export function clearCartApi(){
    let token = localStorage.getItem('freshCartToken')
    return axios.delete(`${base}/api/v1/cart`, {headers: {token}})
}

