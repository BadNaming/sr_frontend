import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CabinetType, CampaignType, TestDataResponseType } from './actionCreators';

type InitialStateType = {
  cabinets: CabinetType[]
  campaigns: CampaignType[]
  metrics: Record<string, string>[]
  isLoading: boolean
  error: string
};

const initialState: InitialStateType = {
  cabinets: [],
  campaigns: [],
  metrics: [],
  isLoading: false,
  error: '',
}

export const fetchTestDataSlice = createSlice({
  name: 'testData',
  initialState,
  reducers: {
    testDataLoading: (state) => {
      state.isLoading = true;
    },
    testDataLoaded: (state, action: PayloadAction<TestDataResponseType>) => {
      state.isLoading = false;
      state.cabinets = action.payload.cabinets;
      state.campaigns = action.payload.campaigns;
      state.metrics = action.payload.metrics;
    },
    testDataLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { testDataLoading, testDataLoaded, testDataLoadingError } = fetchTestDataSlice.actions;

export default fetchTestDataSlice.reducer;