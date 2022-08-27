import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import currencyReducer from './currencySlice'


export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer
  },
})