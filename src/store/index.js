import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import { simplereportsAPI } from './auth/services/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [simplereportsAPI.reducerPath]: simplereportsAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(simplereportsAPI.middleware)
})
