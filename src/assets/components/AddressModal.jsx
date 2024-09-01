import { Alert, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { cartCheckoutSessionApi, cashOrderApi } from "../API/orders";
import { useNavigate } from "react-router-dom";

export default function AddressModal({ modal, setModal , cartId}) {

    let [paymentMethod, setPaymentMethod] = useState('')
    let navigate = useNavigate();

    function handlePaymentChange(event){
        setPaymentMethod(event.target.value);
    }

    const validationSchema = Yup.object({
        details: Yup.string()
            .required("Details are required")
            .min(10, "Details must be at least 10 characters long")
            .max(500, "Details cannot be longer than 500 characters"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(
                /^01[0-2,5]{1}[0-9]{8}$/,
                "Phone number must be a valid Egyptian number"
            ),
        city: Yup.string()
            .required("City is required")
            .min(2, "City name must be at least 2 characters long")
            .max(50, "City name cannot be longer than 50 characters"),
    });

    function handleSubmit(values) {
        console.log(values);
        if (paymentMethod === 'card'){
            cartCheckoutSessionApi({values, cartId})
            .then((data)=>{
                console.log(data);
                setModal(false);
                formik.resetForm();
                window.location.href = data?.data?.session?.url;
            })
        }
        else{
            cashOrderApi({values, cartId})
            .then((data)=>{
                console.log(data);
                setModal(false);
                formik.resetForm();
                navigate('/allorders');
            })
        }
    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit:handleSubmit
    });

    return (
        <div
            className={`fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-[9999] bg-black bg-opacity-55 ${modal ? "" : "hidden"
                }`}
        >
            <div className="modal rounded w-[95%] md:w-[600px] bg-white p-5">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="font-bold mb-5 text-xl">Address Details</h3>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="details"
                            id="details"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer`}
                            placeholder=" "
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label
                            htmlFor="details"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            details
                        </label>
                    </div>
                    {formik.errors.details && formik.touched.details ? <Alert severity="error">{formik.errors.details}</Alert>:''}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer`}
                            placeholder=" "
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label
                            htmlFor="phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            phone
                        </label>
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <Alert severity="error">{formik.errors.phone}</Alert>:''}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer`}
                            placeholder=" "
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label
                            htmlFor="city"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            city
                        </label>
                    </div>
                    {formik.errors.city && formik.touched.city ? <Alert severity="error">{formik.errors.city}</Alert>:''}

                    <h3 className="font-semibold">Payment method</h3>
                    <div className="flex gap-3 mt-2">
                        <div className="flex gap-1 items-center">
                            <input onChange={handlePaymentChange} value={'card'} type="radio" id="card" name="paymentMethod" className="cursor-pointer text-black focus:ring-0"></input>
                            <label htmlFor="card">Card</label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <input onChange={handlePaymentChange} value={'cash'} type="radio" id="cash" name="paymentMethod" className="cursor-pointer text-black focus:ring-0"></input>
                            <label htmlFor="cash">Cash</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 items-center mt-5">
                        <button
                            onClick={() => setModal(false)}
                            className="bg-red-700 text-white px-4 py-1 rounded"
                        >
                            cancel
                        </button>
                        <button
                        type="submit"
                            className="bg-black text-white px-4 py-1 rounded"
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
