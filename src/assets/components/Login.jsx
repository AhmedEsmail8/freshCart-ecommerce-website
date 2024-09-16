import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../API/authentication';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { signin } from '../lib/slices/userSlice';
import { InputAdornment, TextField } from '@mui/material';

export default function Login() {

  if (localStorage.getItem('freshCartToken')) {
    return <Navigate to={'/home'}></Navigate>
  }

  let [loginStatus, setLoginStatus] = useState(true);
  let [showPassword, setShowPassword] = useState(false);
  let email = useRef();
  let password = useRef();

  let validationSchema = Yup.object({
    email: Yup.string()
      .required('email is required')
      .email('please, Enter a valid email.')
    ,

    password: Yup.string()
      .required('password is required')

  })

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const queryClient = useQueryClient()
  let { mutate, data, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);

      localStorage.setItem('freshCartToken', data.data.token);
      setLoginStatus(true);
      dispatch(signin())
      navigate('/home');
    },
    onError: (error) => {
      setLoginStatus(false);
    },
  })



  function onSubmit(values) {
    console.log(values);

    let validEmail = email?.current?.value?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let validPassword = password?.current?.value?.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/);
    if (formik.errors.email || formik.errors.password || !validEmail || !validPassword) {
      setLoginStatus(false);
      return;
    }
    mutate(values);

  }


  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit
  })

  return (
    <div className='py-16'>
      <div className='flex flex-col items-center'>

        {isPending ? <Loader></Loader> : ''}
        <div className='flex justify-center items-center mx-auto w-[90px] h-[90px] bg-gray-50 dark:bg-[#1b1b1b] rounded-full'>
          <div className='flex justify-center items-center w-[70px] h-[70px] bg-gray-200 dark:bg-[#1b1b1b] rounded-full'>
            <i className='fa-solid fa-user text-black dark:text-white text-4xl'></i>
          </div>
        </div>
        <h1 className='text-3xl font-[600] mb-2 text-center'>Sign in</h1>

        <form className='mt-4' onSubmit={formik.handleSubmit} noValidate>

          {!loginStatus ? <div className='mb-2 w-full'><Alert severity="error">Invalid email or password.</Alert></div> : ''}
          <div className='flex flex-col w-full'>
            <label htmlFor="email">Email:</label>
            <TextField
              inputRef={email}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              id="email"
              name="email"
              size='small'
              sx={{'input':{'padding': '10px'}}}
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

          {/* <div className='flex flex-col w-full'>
            <label htmlFor="email">Email:</label>
            <input ref={email} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' className='rounded w-[95vw] sm:w-[400px] dark:text-black border-gray-300 border-2 focus:border-[#000] focus:ring-0' />
          </div> */}

          <div className='flex flex-col w-full mt-2'>
            <label htmlFor="password">Password:</label>
            <TextField
              inputRef={password}
              onChange={formik.handleChange}
              value={formik.values.password}
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              size='small'
              sx={{'input':{'padding': '10px'}}}
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
          {/* <div className='flex flex-col w-full mt-2'>
            <label htmlFor="password">Password:</label>
            <input ref={password} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' className='rounded w-[95vw] dark:text-black sm:w-[400px] border-gray-300 border-2 focus:border-[#000] focus:ring-0' />
          </div> */}


          <button type='submit' className='bg-black text-white sm:w-[400px] w-full py-2 rounded mt-3'>login</button>
          <Link to={'/forgetpassword'} className='mt-2 text-gray-500 block hover:text-black dark:hover:text-gray-300 font-[500] transition-colors w-fit'>Forget your password?</Link>

        </form>
      </div>
    </div>
  )
}
