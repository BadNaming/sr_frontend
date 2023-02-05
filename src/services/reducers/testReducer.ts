/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TTest } from "./types";

const testState: TTest = {
  isAuth: false,
};

const testSlice = createSlice({
  name: "ingredient",
  initialState: testState,
  reducers: {
    userAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const testReducers = testSlice.reducer;
export const testActions = testSlice.actions;
