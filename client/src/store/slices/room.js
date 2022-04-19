import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {  },
}

export const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setData(state, { payload }) {
      if (payload) {
        state.data = {
          ...payload,
        }
      }
    },
  }
});

export const { setData } = room.actions;

export default room.reducer;