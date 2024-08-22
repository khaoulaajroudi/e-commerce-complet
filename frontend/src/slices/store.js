import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice' 
import cartReducer from './cartSlice' 
import authReducer from './authSlice' 
import ordersSlice from './orderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    order:ordersSlice,
    cart: cartReducer,
    auth: authReducer,
  },
})