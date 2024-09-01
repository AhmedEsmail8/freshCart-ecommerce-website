import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './assets/components/Layout'
import Home from './assets/components/Home'
import Login from './assets/components/Login'
import Register from './assets/components/Register'
import ForgetPassword from './assets/components/ForgetPassword'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ResetCode from './assets/components/ResetCode'
import NewPassword from './assets/components/NewPassword'
import Loader from './assets/components/Loader'
import Categories from './assets/components/Categories'
import Brands from './assets/components/Brands'
import Products from './assets/components/Products'
import NotFound from './assets/components/NotFound'
import Cart from './assets/components/Cart'
import WishList from './assets/components/WishList'
import ProductDetails from './assets/components/ProductDetails';
import Orders from './assets/components/Orders';
import ProtectedRoute from './assets/components/ProtectedRoute';




function App() {

  let routes = createBrowserRouter([
    {path: '/', element: <Layout></Layout>, children:[
      {index: true, element: <Login></Login>},
      {path: '/login', element: <Login></Login>},
      {path: '/register', element: <Register></Register>},
      {path: '/home', element: <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path: '/forgetpassword', element: <ForgetPassword></ForgetPassword>},
      {path: '/resetcode', element: <ResetCode></ResetCode>},
      {path: '/resetpassword', element: <NewPassword></NewPassword>},
      {path: '/categories', element: <ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path: 'brands', element: <ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path: '/products', element:<ProtectedRoute><Products></Products></ProtectedRoute>},
      {path: '*', element: <NotFound></NotFound>},
      {path: '/products/:category/:brand', element: <ProtectedRoute><Products></Products></ProtectedRoute>},
      {path: '/cart', element: <ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path: '/wishlist', element: <ProtectedRoute><WishList></WishList></ProtectedRoute>},
      {path: '/productdetails/:id', element: <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path: '/allorders', element: <ProtectedRoute><Orders></Orders></ProtectedRoute>}
    ]}
  ])


  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
