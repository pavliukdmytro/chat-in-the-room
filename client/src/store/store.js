import { configureStore } from '@reduxjs/toolkit';

import authData from './slices/authData';
import room from './slices/room';

export const store = configureStore({
  reducer: {
    authData,
    room,
  },
})