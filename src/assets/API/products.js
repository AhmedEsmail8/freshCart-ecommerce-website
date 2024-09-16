import axios from "axios";

let base = 'https://ecommerce.routemisr.com';

export function getProductsApi({price, category, page, brand, keyWord}){
    console.log('here');
    
    
    let categories = '', brands = '', priceFilter='';
    if (category?.length>0)
      categories = 'category='+category.join('&category=')
    // console.log(`categories ==== ${categories}`);
    
    
    if (brand?.length>0)
      brands = 'brand='+brand.join('&brand=')
    console.log('hi');
    
    // console.log(`brands ==== ${brands}`);
    
    if (price?.length > 0){
      priceFilter = `price[lte]=${price[1]}&price[gte]=${price[0]}`;
    }
    // console.log(`priceFilter ==== ${priceFilter}`);
    
    if (category===-1){
      // console.log('NOT FOUND');
      return {};
    }

    // console.log(`${base}/api/v1/products?page=${page}&${brands}&${categories}&${priceFilter}`);
    console.log(`${base}/api/v1/products?${page===''?'':`page=${page}`}&${brands}&${categories}&${priceFilter}&${keyWord!='' || keyWord?`keyword=${keyWord}`:''}`);
    
    
    
    return axios.get(`${base}/api/v1/products?${page===''?'':`page=${page}`}&${brands}&${categories}&${priceFilter}&${keyWord!='' || keyWord?`keyword=${keyWord}`:''}`)
}


export function getProductIdApi(id){
  return axios.get(`${base}/api/v1/products/${id}`)
}