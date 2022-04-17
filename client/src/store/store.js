import { configureStore } from '@reduxjs/toolkit';

import authData from './slices/authData';

export const store = configureStore({
  reducer: {
    authData,
  },
})