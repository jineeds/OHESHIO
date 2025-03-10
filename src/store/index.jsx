import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import productR from './modules/productsSlice';
export const store = configureStore({
  reducer: {
    authR,
    productR,
  },
});
