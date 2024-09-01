import axios from "axios"

let base = 'https://ecommerce.routemisr.com'

export function getCategoriesApi(){
    return axios.get(`${base}/api/v1/categories`)
}