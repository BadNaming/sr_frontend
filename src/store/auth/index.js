import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // user: null,
  user: 'Константинов Константин',
  // isAuthenticated: false,
  isAuthenticated: true,
  onSuccess: null,
  errors: null,
  // email: null,
  email: 'study.business@yandex.ru',
  AdvPlatform: null,
  AdvCabinet: null,
  isAdvCabinet: false

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state) => {
      state.user = 'Константинов Константин';
      state.isAuthenticated = true;
    },
    addAdvPlatform: (state, action) => {
      state.AdvPlatform = action.payload;
    },
    addAdvCabinet: (state, action) => {
      state.AdvCabinet = action.payload;
      state.isAdvCabinet = true;
    },
  },
});

  export const { addUser, addAdvPlatform, addAdvCabinet} = authSlice.actions;

  export default authSlice.reducer;
