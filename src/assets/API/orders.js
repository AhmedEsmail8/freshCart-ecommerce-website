import axios from "axios"
import {jwtDecode} from 'jwt-decode';

let base = 'https://ecommerce.routemisr.com'




export function getOrdersApi(){
    let token = localStorage.getItem('freshCartToken')
let decodedToken = '';
if (token){
    decodedToken = jwtDecode(token);
}

    return axios.get(`${base}/api/v1/orders/user/${decodedToken.id}`)
}

export function cartCheckoutSessionApi({values, cartId}){
    let token = localStorage.getItem('freshCartToken')
    return axios.post(`${base}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, {"shippingAddress": values}, {headers: {token}})
}

export function cashOrderApi({values, cartId}){
    let token = localStorage.getItem('freshCartToken')
    return axios.post(`${base}/api/v1/orders/${cartId}`, {"shippingAddress": values}, {headers: {token}})
}