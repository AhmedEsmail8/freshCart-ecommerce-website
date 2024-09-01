import axios from "axios";

let base = 'https://ecommerce.routemisr.com'

export function getBrandsApi(){
    return axios.get(`${base}/api/v1/brands`)
}