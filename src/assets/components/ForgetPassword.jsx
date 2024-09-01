import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResetEmail } from '../lib/slices/userSlice';
import Swal from 'sweetalert2';
import Loader from './Loader'
import axios from 'axios';

export default function ForgetPassword() {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [pending, setPending] = useState(false);

  let validationSchema = Yup.object({
    email: Yup.string()
      .required('Please, enter your email.')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email not valid *exemple@yyy.zzz')
  })

  function onSubmit(values) {
    setPending(true);
    
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    .then((data)=>{
      dispatch(setResetEmail(values.email))
      setPending(false);
      navigate('/resetcode');
    })
    .catch((error)=>{
      console.log(error);
      
      setPending(false);
      Swal.fire({
        title: 'Account Not Found',
        text: 'The email address you entered is not associated with any account. Please check the email and try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      })
    })
  }

  let formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit
  })

  
  
  
  return (
    <div className='flex flex-col items-center mt-16'>
      {pending?<Loader></Loader>:''}
      <div className='flex justify-center items-center w-[80px] h-[80px] bg-gray-50 rounded-full'>
        <div className='flex justify-center items-center w-[60px] h-[60px] bg-gray-200 rounded-full'>
          <i className='fa-solid fa-key text-black text-2xl'></i>
        </div>
      </div>

      <h2 className='text-2xl font-[600]'>Forgot password?</h2>
      <p className='text-gray-400'>No worries, we'll send you reset instructions</p>

      <form onSubmit={formik.handleSubmit} className='mt-4'>
        <div className='flex flex-col w-full'>
          <label htmlFor="email">Email:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' className='rounded w-[95vw] sm:w-[400px] border-gray-300 border-2 focus:border-[#000] focus:ring-0' />
        </div>

        {formik.touched.email && formik.errors.email ? <div className='mt-2'><Alert severity='error'>{formik.errors.email}</Alert></div> : ''}

        <button type='submit' className='bg-black text-white sm:w-[400px] w-full py-2 rounded mt-3'>Reset Password</button>
      </form>

      <Link to={'/login'} className='text-gray-500 mt-3'>
      <i className="fa-solid fa-arrow-left"></i>
      <span className='ms-2'>back to login</span>
      </Link >
    </div>
  )
}
