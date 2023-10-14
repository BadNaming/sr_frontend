import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  onSuccess: null,
  errors: null,
  AdvPlatform: [],
  AdvCabinet: null,
  isAdvCabinet: false,
  statistics: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = {
        ...action.payload
      }
      state.isAuthenticated = true
    },
    addAdvPlatform: (state, action) => {
      state.AdvPlatform.push(action.payload)
    },
    addAdvCabinet: (state, action) => {
      state.AdvCabinet = action.payload
      state.isAdvCabinet = true
    },
    addAddPlans: (state, action) => {
      state.AddPlans.push(action.payload)
    },
    setStatistics: (state, action) => {
      state.statistics = action.payload
    }
  }
})

export const { addUser, addAdvPlatform, addAdvCabinet, setStatistics } =
  authSlice.actions

export default authSlice.reducer
