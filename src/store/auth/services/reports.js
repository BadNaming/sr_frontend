import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { APP_NAME, BASE_URL } from '../../../utils/constants'

export const simplereportsAPIReports = createApi({
  reducerPath: 'simplereportsAPIReports',
  tagTypes: ['Report'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(`${APP_NAME}Token`)
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    addDailyData: builder.mutation({
      query: () => ({
        url: 'v1/add_daily_data/',
        method: 'POST'
      })
      //Tags
    }),
    createReport: builder.mutation({
      query: (body) => ({
        url: 'v1/create_report/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Report', id: 'LIST' }]
    }),
    getReports: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `v1/my_reports${`?start_date=${startDate}&end_date=${endDate}`}`,
        method: 'GET'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Report', id })),
              { type: 'Report', id: 'LIST' }
            ]
          : [{ type: 'Report', id: 'LIST' }]
    }),
    getStatistics: builder.query({
      query: () => ({
        url: 'v1/statistics/',
        method: 'GET'
      }),
      providesTags: ['Statistics']
    })
  })
})

export const {
  useAddDailyDataMutation,
  useCreateReportMutation,
  useGetReportsQuery,
  useGetStatisticsQuery
} = simplereportsAPIReports
