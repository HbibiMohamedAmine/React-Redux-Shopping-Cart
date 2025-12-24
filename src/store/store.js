import {configureStore} from '@reduxjs/toolkit';
import panier from '../features/counter/counterSlice';
export const store = configureStore({
  reducer: {
    panier:panier
  },
});