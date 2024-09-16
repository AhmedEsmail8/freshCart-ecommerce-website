import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeResetEmail, setCode } from '../lib/slices/userSlice';
import { verifyCodeApi } from '../API/authentication';
import Loader from './Loader';
import Swal from 'sweetalert2';

export default function CodeInput() {
  const inputRefs = useRef([]);
  let navigate = useNavigate();
  let [pending, setPending] = useState(false);
  let dispatch = useDispatch()

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleChange(e, index) {
    const value = e.target.value;

    if (!value.match(/[0-9]/)) {
      e.target.value = '';
      return;
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } 
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  let result = '';

  function handleSubmit(e){

    e.preventDefault();
    
    for (let i=0; i<6; i++){
      result+=inputRefs.current[i].value;
      if (!inputRefs.current[i].value || (!inputRefs.current[i].value && i==5)){
        result = '';
        return;
      }
    }

    console.log(result);
    setPending(true);
    verifyCodeApi({"resetCode": result})
    .then((data) => {
      dispatch(setCode());
      setPending(false);
      navigate('/resetpassword');
    })
    .catch((error) => {
      setPending(false)
      Swal.fire({
        title: 'Invalid Reset Code',
        text: 'The reset code you entered is incorrect.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    });

  }

  return (
    <form className='mt-5 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
      {pending?<Loader></Loader>:''}
      <div className='flex gap-3'>
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          ref={(el) => inputRefs.current[index] = el}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className='code-input-tw dark:text-black'
          id={`CodeInput${index}`}
          name={`CodeInput${index}`}
        />
      ))}
      </div>

    <button type='submit' className='authBtn rounded w-[fit-content] px-5 py-2 text-xl mt-5 dark:text-white dark:border-white dark:hover:border-gray-400 dark:transition-none dark:hover:text-gray-400 dark:hover:bg-transparent'><i className="fa-solid fa-arrow-right"></i></button>
    </form>
  );
}
