import { Alert } from '@mui/material';
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { removeResetEmail, resetCode } from '../lib/slices/userSlice';
import { resetPasswordApi } from '../API/authentication';

export default function NewPassword() {

    let {codeEntered, resetEmail} = useSelector(data=>data.user);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let validationSchema = Yup.object({
        password: Yup.string()
            .required('password is required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Enter valid password *Minimum eight characters, at least one letter and one number:*'),

        repassword: Yup.string()
            .oneOf([Yup.ref('password')], "repassword doesn't match the password")
            .required('repassword is required')
    })

    function onSubmit(values) {
        console.log(values);
        resetPasswordApi({"email": resetEmail, "newPassword": values.password})
        .then((data)=>{
            Swal.fire({
                title: "Password Reset Successful!",
                text: "Your password has been successfully reset. You can now log in with your new credentials.",
                icon: "success",
                didClose:()=>{
                    dispatch(resetCode());
                    dispatch(removeResetEmail());
                    navigate('/login');
                }
            })
        })
        .catch((error)=>{
            Swal.fire({
                title: "Error!",
                text: "Something wrong.",
                icon: "error",
                didClose:()=>{
                    dispatch(resetCode());
                    dispatch(removeResetEmail());
                    navigate('/login');
                }
            })
        })
        
    }


    let formik = useFormik({
        initialValues: {
            password: '',
            repassword: ''
        },
        validationSchema,
        onSubmit
    })

    if (!codeEntered)
        return <Navigate to={'/'}></Navigate>

    return (
        <div className='flex flex-col items-center mt-6'>
            <div className='flex justify-center items-center w-[80px] h-[80px] bg-gray-50 rounded-full'>
                <div className='flex justify-center items-center w-[60px] h-[60px] bg-gray-200 rounded-full'>
                    <i className='fa-solid fa-key text-black text-2xl'></i>
                </div>
            </div>

            <h2 className='text-2xl font-[600]'>Set new password</h2>
            <p className='text-gray-400 w-[300px] text-center'>Your new password must be different to previously used passwords.</p>

            <form onSubmit={formik.handleSubmit} className='mt-4'>
                <div className='flex flex-col w-full'>
                    <label htmlFor="password">Password</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' className='rounded w-[95vw] sm:w-[400px] border-gray-300 border-2 focus:border-[#000] focus:ring-0' />
                </div>

                {formik.touched.password && formik.errors.password ? <div className='mt-2 w-[95vw] sm:w-[400px]'><Alert severity='error'>{formik.errors.password}</Alert></div> : ''}

                <div className='flex flex-col w-full mt-3'>
                    <label htmlFor="repassword">Confirm password</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repassword} type="password" id='repassword' name='repassword' className='rounded w-[95vw] sm:w-[400px] border-gray-300 border-2 focus:border-[#000] focus:ring-0' />
                </div>

                {formik.touched.repassword && formik.errors.repassword ? <div className='mt-2 w-[95vw] sm:w-[400px]'><Alert severity='error'>{formik.errors.repassword}</Alert></div> : ''}


                <button type='submit' className='bg-black hover:bg-[#222222] text-white sm:w-[400px] w-full py-2 rounded mt-3'>Reset Password</button>
            </form>
        </div>
    )
}
