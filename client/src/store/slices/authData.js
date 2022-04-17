import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  isLoad: false,
  user: null,
}

export const authData = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.isLoad = true;

      if (payload) {
        state.user = {
          ...payload,
        }
      } else {
        state.user = null;
      }
    },
    removeUser(state) {
      state.user = null;
    }
  }
});

export const { setData, removeUser } = authData.actions;

export default authData.reducer;

export const fetchAuth = () => async (dispatch) => {
  const { data, status } = await axios.get('/auth');

  if (status === 200 && data.ok) {
    dispatch( setData(data.user) );

    return data;
  }
}