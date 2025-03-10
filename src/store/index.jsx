import { configureStore } from '@reduxjs/toolkit';
import authR from './modules/authSlice';
import cartR from './modules/cartSlice';
export const store = configureStore({
  reducer: {
    authR,
    cartR,
  },
});
