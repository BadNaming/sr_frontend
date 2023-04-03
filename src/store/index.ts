import { configureStore } from '@reduxjs/toolkit';
import fetchTestDataSlice from './reducers/fetchAllDataSlice';

export const store = configureStore({
  reducer: {
    testData: fetchTestDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;