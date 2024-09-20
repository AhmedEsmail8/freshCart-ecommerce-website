// import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './assets/components/Layout'
// import Home from './assets/components/Home'
import Login from './assets/components/Login'
import Register from './assets/components/Register'
import ForgetPassword from './assets/components/ForgetPassword'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ResetCode from './assets/components/ResetCode'
import NewPassword from './assets/components/NewPassword'
import Categories from './assets/components/Categories'
import Brands from './assets/components/Brands'
// import Products from './assets/components/Products'
import NotFound from './assets/components/NotFound'
import Cart from './assets/components/Cart'
import WishList from './assets/components/WishList'
// import ProductDetails from './assets/components/ProductDetails';
// import Orders from './assets/components/Orders';
import ProtectedRoute from './assets/components/ProtectedRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './assets/lib/slices/themeSlice';
import { lazy, Suspense } from 'react';
import Loader from './assets/components/Loader';
import ErrorBoundary from './assets/components/ErrorBoundary';

const Home = lazy(() => import('./assets/components/Home'));
const Products = lazy(() => import('./assets/components/Products'));
const Orders = lazy(() => import('./assets/components/Orders'));
const ProductDetails = lazy(() => import('./assets/components/ProductDetails'));


function App() {

  let dispatch = useDispatch();

  if (!localStorage.getItem('freshCartTheme')) {
    localStorage.setItem('freshCartTheme', 'light');
  }

  dispatch(setTheme(localStorage.getItem('freshCartTheme')));
  let { theme } = useSelector((data) => data.theme)

  if (theme === 'dark')
    document.documentElement.classList.add('dark');
  else
    document.documentElement.classList.remove('dark');

  let routes = createBrowserRouter([
    {
      path: '/', element: <Layout></Layout>, children: [
        { index: true, element: <Login></Login>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/login', element: <Login></Login>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/register', element: <Register></Register>, errorElement: <ErrorBoundary></ErrorBoundary> },
        {
          path: '/home', element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader></Loader>}>
                <Home></Home>
              </Suspense>
            </ProtectedRoute>
          ), errorElement: <ErrorBoundary></ErrorBoundary>
        },
        { path: '/forgetpassword', element: <ForgetPassword></ForgetPassword>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/resetcode', element: <ResetCode></ResetCode>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/resetpassword', element: <NewPassword></NewPassword>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/categories', element: <ProtectedRoute><Categories></Categories></ProtectedRoute>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: 'brands', element: <ProtectedRoute><Brands></Brands></ProtectedRoute>, errorElement: <ErrorBoundary></ErrorBoundary> },
        {
          path: '/products', element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader></Loader>}>
                <Products></Products>
              </Suspense>
            </ProtectedRoute>
          ), errorElement: <ErrorBoundary></ErrorBoundary>
        },
        { path: '*', element: <NotFound></NotFound>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/products/:category/:brand', element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Products></Products>
            </Suspense>
          </ProtectedRoute>
        ), errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/cart', element: <ProtectedRoute><Cart></Cart></ProtectedRoute>, errorElement: <ErrorBoundary></ErrorBoundary> },
        { path: '/wishlist', element: <ProtectedRoute><WishList></WishList></ProtectedRoute>, errorElement: <ErrorBoundary></ErrorBoundary> },
        {
          path: '/productdetails/:id', element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <ProductDetails></ProductDetails>
              </Suspense>
            </ProtectedRoute>
          ), errorElement: <ErrorBoundary></ErrorBoundary>
        },
        {
          path: '/allorders', element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Orders></Orders>
              </Suspense>
            </ProtectedRoute>
          ), errorElement: <ErrorBoundary></ErrorBoundary>
        },
        { path: 'tmp', element: <ErrorBoundary></ErrorBoundary>, errorElement: <ErrorBoundary></ErrorBoundary> }
      ]
    }
  ])


  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  )
}

export default App
