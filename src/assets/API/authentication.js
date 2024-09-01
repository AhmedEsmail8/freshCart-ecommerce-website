import axios from "axios";

let base = 'https://ecommerce.routemisr.com'

export function login(values){
    return axios.post(`${base}/api/v1/auth/signin`, values);
}

export function register(values){
    return axios.post(`${base}/api/v1/auth/signup`, values);
}

export function verifyCodeApi(values){
    return axios.post(`${base}/api/v1/auth/verifyResetCode`, values);
}

export function resetPasswordApi(values){
    console.log(values);
    
    return axios.put(`${base}/api/v1/auth/resetPassword`, values);
}