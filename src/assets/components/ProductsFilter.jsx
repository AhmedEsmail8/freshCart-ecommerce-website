import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategoriesApi } from '../API/categories'
import { Checkbox } from '@mui/material';
import { getBrandsApi } from '../API/brands';
import { Slider } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, setBrands, setCategories, setPrice, toggleFilterOpen } from '../lib/slices/ProductsFilterSlice';
import { useFormik } from 'formik';

export default function ProductsFilter({setFilterClicked, setPage}) {

  let filter = useSelector((data) => data.productsFilter);
  const [priceFilter, setPriceFilter] = React.useState(filter.price);


  let { data: brandsData, isLoading: brandsLoading, isError: brandsIsError, error: brandsError } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrandsApi
  })


  let { data: categoriesData, isLoading: categoriesLoading, isError: categoriesIsError, error: categoriesError } = useQuery({
    queryKey: ['filterCategories'],
    queryFn: getCategoriesApi
  })

  let { filterOpen } = useSelector((data) => data.productsFilter);
  let dispatch = useDispatch();

  function onSubmit(values){
    dispatch(setPrice(priceFilter));
    dispatch(setCategories(values.categories));
    dispatch(setBrands(values.brands));
    dispatch(toggleFilterOpen());
    setFilterClicked(true);
    setPage(1);
  }

  function onReset(){
    dispatch(resetFilter());
    dispatch(toggleFilterOpen());
    setFilterClicked(false);
    setPage(1);
  }

  let formik = useFormik({
    initialValues: {
      categories: filter.categories,
      brands: filter.brands
    },
    onSubmit,
    onReset
  })

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  function handleCategoryChange(e, category) {
    let isChecked = e.target.checked;
    if (isChecked) {
      formik.setFieldValue("categories", [...formik.values.categories, category]);
    } else {
      formik.setFieldValue("categories", formik.values.categories.filter(c => c !== category));
    }
  }

  function handleBrandChange(e, brand) {
    let isChecked = e.target.checked;
    if (isChecked) {
      formik.setFieldValue("brands", [...formik.values.brands, brand]);
    } else {
      formik.setFieldValue("brands", formik.values.brands.filter(c => c !== brand));
    }
  }

  function handleFilter(e){
    e.preventDefault();
    console.log(e);
  }


  return (
    <>
      {filterOpen && (<div className='overlay bg-black fixed top-0 bottom-0 left-0 right-0 z-50 bg-opacity-45'></div>)}
      <div className={`fixed top-0 bottom-0 left-0 w-[300px] bg-white dark:bg-[#121212] z-50 overflow-x-hidden overflow-y-auto transition-transform ${filterOpen ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
        <div className='border-b-1 dark:border-gray-500'>
          <div className='flex justify-between items-center p-3'>
            <h3 className='text-lg font-bold uppercase'>Filter</h3>
            <i className='fa-solid fa-x cursor-pointer' onClick={() => { dispatch(toggleFilterOpen()) }}></i>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className='filter-section'>

            <div className='border-b-1 dark:border-gray-500'>
              <div className='p-3'>
                <h4 className='filter-title text-black dark:text-white font-semibold'>Price</h4>
                <Slider
                  label=" "
                  step={50}
                  minValue={0}
                  maxValue={30000}
                  formatOptions={{ style: "currency", currency: "EGP" }}
                  color='foreground'
                  size='sm'
                  classNames={{
                    base: 'max-w-md',
                  }}
                  value={priceFilter}
                  onChange={setPriceFilter}
                />

              </div>

            </div>

            <div className='border-b-1 dark:border-gray-500'>
              <div className='p-3'>
                <h4 className='filter-title text-black font-semibold dark:text-white'>Category</h4>
                <div className='filter-section overflow-x-hidden overflow-y-auto h-[200px]'>
                  {categoriesData?.data?.data?.map((category, index) => (
                    <div className='flex items-center' key={category._id}>
                      <Checkbox 
                      {...label} 
                      id={`${category._id}`} 
                      name={`${category.name}`} 
                      onChange={(e)=>{handleCategoryChange(e, category._id)}}
                      color='default' 
                      checked={formik.values.categories.includes(category._id)}
                      />
                      <label htmlFor={`${category._id}`} className='dark:text-gray-300'>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='border-b-1 dark:border-gray-500'>
              <div className='p-3'>
                <h4 className='filter-title text-black font-semibold dark:text-white'>Brand</h4>
                <div className='filter-section overflow-x-hidden overflow-y-auto h-[200px]'>
                  {brandsData?.data?.data?.map((brand, index) => (
                    <div className='flex items-center' key={brand._id}>
                      <Checkbox 
                      {...label} 
                      id={`${brand._id}`} 
                      name={`${brand.name}`} 
                      onChange={(e)=>{handleBrandChange(e, brand._id)}}
                      color='default'
                      checked={formik.values.brands.includes(brand._id)}
                      />
                      <label htmlFor={`${brand._id}`} className='dark:text-gray-300'>{brand.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex p-3'>
              <div className='px-1 w-1/2'>
                <button type='reset' className='w-full bg-transparent border-1 dark:border-white border-black py-1 rounded mt-3 dark:hover:bg-[#272727] hover:bg-black hover:text-white'>Reset</button>
              </div>
              <div className='px-1 w-1/2'>
                <button type='submit' className='w-full bg-black text-white py-1 rounded mt-3 hover:bg-[#272727]'>Apply</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}