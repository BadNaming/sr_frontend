import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import { simplereportsAPI } from './auth/services/auth'
import { simplereportsAPIReports } from './auth/services/reports'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [simplereportsAPI.reducerPath]: simplereportsAPI.reducer,
    [simplereportsAPIReports.reducerPath]: simplereportsAPIReports.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(simplereportsAPI.middleware)
      .concat(simplereportsAPIReports.middleware)
})
