import axios from "axios";
import { AppDispatch } from "..";
import { testDataLoading, testDataLoaded, testDataLoadingError } from "./fetchAllDataSlice";

export type CabinetType = {
  id: number
  ext_id: number
  ext_name: string
}

export type CampaignType = {
  ext_id: number
  ext_name: string
  cabinet: number
}

export type TestDataResponseType = {
  cabinets: CabinetType[]
  campaigns: CampaignType[]
  metrics: Record<string, string>[]
}

export const fetchAllData = () => async (dispatch: AppDispatch) => {
  dispatch(testDataLoading());
  await axios.get<TestDataResponseType>('https://test-simplereports.ru/api/v1/info/')
    .then((res) => dispatch(testDataLoaded(res.data)))
    .catch((error) => dispatch(testDataLoadingError(error.message)))
}

