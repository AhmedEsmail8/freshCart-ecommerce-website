import React, { useState } from 'react';
import InputAlert from './InputAlert';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { register } from '../API/authentication';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { signin } from '../lib/slices/userSlice';

export default function Register() {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [showPassword, setShowPassword] = useState(false);

  let { mutate, data, error, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      navigate('/home');
      localStorage.setItem('freshCartToken', data.data.token);
      dispatch(signin());
    },
    onError: (data) => {
      console.log(data);
      if (data.response.status == 409) {
        Swal.fire({
          title: "Error!",
          text: "Account already exist.",
          icon: "error",
        })
      }
    }
  });

  let validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[A-Za-z]{3,}(?: [A-Za-z]{3,})*$/, 'Special characters and numbers not allowed'),

    email: Yup.string()
      .email('Email not valid *example@yyy.zzz')
      .required('Email is required')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email not valid *example@yyy.zzz'),

    password: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Enter valid password *Minimum eight characters, at least one letter and one number:*'),

    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], "Repassword doesn't match the password")
      .required('Repassword is required'),

    phone: Yup.string()
      .required('Phone is required')
      .matches(/^0(10|11|12|15)\d{8}$/, 'Enter valid Phone Number')
  });

  function onSubmit(values) {
    mutate(values);
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit
  });

  return (
    <div className='py-16'>
      <div className='flex flex-col items-center'>

        {isPending ? <Loader /> : ''}
        <div className='flex justify-center items-center mx-auto w-[90px] h-[90px] bg-gray-50 rounded-full dark:bg-[#1b1b1b]'>
          <div className='flex justify-center items-center w-[70px] h-[70px] bg-gray-200 rounded-full dark:bg-[#1b1b1b]'>
            <i className='fa-solid fa-user text-black text-4xl dark:text-white'></i>
          </div>
        </div>
        <h1 className='text-3xl font-[600] mb-2 text-center'>Sign Up</h1>

        <form className='mt-4 md:w-[600px] w-[95%]' onSubmit={formik.handleSubmit} noValidate>
          <div className='flex flex-col w-full'>
            <label htmlFor="name">Name:</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              name="name"
              size='small'
              sx={{ 'input': { 'padding': '10px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-regular fa-circle-user'></i>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>

          {formik.touched.name && formik.errors.name ? <div className='mt-2'><Alert severity="error">{formik.errors.name}</Alert></div> : ''}

          <div className='flex flex-col w-full mt-2'>
            <label htmlFor="email">Email:</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              size='small'
              sx={{ 'input': { 'padding': '10px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-solid fa-envelope'></i>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>

          {formik.touched.email && formik.errors.email ? <div className='mt-2'><Alert severity="error">{formik.errors.email}</Alert></div> : ''}

          <div className='flex flex-col w-full mt-2'>
            <label htmlFor="password">Password:</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              size='small'
              sx={{ 'input': { 'padding': '10px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-solid fa-lock'></i>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <i className={`fa-solid ${!showPassword ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer ps-2`} onClick={() => { setShowPassword(!showPassword) }}></i>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>

          {formik.touched.password && formik.errors.password ? <div className='mt-2'><Alert severity="error">{formik.errors.password}</Alert></div> : ''}

          <div className='flex flex-col w-full mt-2'>
            <label htmlFor="rePassword">Confirm password:</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              type='password'
              id="rePassword"
              name="rePassword"
              size='small'
              sx={{ 'input': { 'padding': '10px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-solid fa-lock'></i>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>

          {formik.touched.rePassword && formik.errors.rePassword ? <div className='mt-2'><Alert severity="error">{formik.errors.rePassword}</Alert></div> : ''}

          <div className='flex flex-col w-full mt-2'>
            <label htmlFor="phone">Phone:</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              type="tel"
              id="phone"
              name="phone"
              size='small'
              sx={{ 'input': { 'padding': '10px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='fa-solid fa-phone'></i>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>

          {formik.touched.phone && formik.errors.phone ? <div className='mt-2'><Alert severity="error">{formik.errors.phone}</Alert></div> : ''}

          <button type='submit' className='bg-black text-white w-full py-2 rounded mt-3'>Register</button>
          <p className='text-center mt-3 text-gray-500 sm:hidden block'>Already have an account? <span><Link to={'/login'} className='text-black dark:text-white'>Login here</Link></span></p>
        </form>
      </div>
    </div>
  )
}
