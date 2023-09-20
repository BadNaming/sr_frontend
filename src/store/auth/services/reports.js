import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { APP_NAME, BASE_URL } from '../../../utils/constants'

export const simplereportsAPIReports = createApi({
  reducerPath: 'simplereportsAPIReports',
  tagTypes: ['Report'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    addDailyData: builder.mutation({
      query: () => ({
        url: `v1/add_daily_data/`,
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem(`${APP_NAME}Token`)}`
        }
      })
    })
  })
})

export const { useAddDailyDataMutation } = simplereportsAPIReports
