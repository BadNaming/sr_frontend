import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  onSuccess: null,
  errors: null,
  AdvPlatform: null,
  AdvCabinet: null,
  isAdvCabinet: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state) => {
      state.user = {
        name: 'Константинов Константин',
        email: 'study.business@yandex.ru',
        phone: '8 (919) 558-37-45'
      }
      state.isAuthenticated = true
    },
    addAdvPlatform: (state, action) => {
      state.AdvPlatform = action.payload
    },
    addAdvCabinet: (state, action) => {
      state.AdvCabinet = action.payload
      state.isAdvCabinet = true
    }
  }
})

export const { addUser, addAdvPlatform, addAdvCabinet } = authSlice.actions

export default authSlice.reducer
