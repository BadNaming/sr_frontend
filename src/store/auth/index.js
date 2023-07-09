import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  onSuccess: null,
  errors: null,
  AdvPlatform: null,
  AdvCabinet: null,
  isAdvCabinet: false
};

// const initialState = {
//   user: {
//     name: 'Константинов Константин',
//     email: 'study.business@yandex.ru',
//     phone: '8 (919) 558-37-45'
//   },
//   // user: null,
//   isAuthenticated: true,
//   onSuccess: null,
//   errors: null,
//   AdvPlatform: {
//     _id: 1,
//     company: 'ВКонтакте',
//     company_id: 13159
//   },
//   AdvCabinet: null,
//   isAdvCabinet: false
// };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state) => {
      state.user = {
        name: 'Константинов Константин',
        email: 'study.business@yandex.ru',
        phone: '8 (919) 558-37-45'
      };
      // state.user = {};
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
