import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/userSlice'
import { productsFilterReducer } from './slices/ProductsFilterSlice'
import { themeReducer } from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    productsFilter: productsFilterReducer,
    theme: themeReducer
  },
})