import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { APP_NAME, BASE_URL } from '../../../utils/constants'

export const simplereportsAPI = createApi({
  reducerPath: 'simplereportsAPI',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (createUserDto) => ({
        url: `auth/users/`,
        method: 'POST',
        body: createUserDto
      })
    }),
    getToken: builder.mutation({
      query: (credentials) => ({
        url: `auth/token/login/`,
        method: 'POST',
        body: credentials
      })
    }),
    updateUser: builder.mutation({
      query: (patch) => ({
        url: `auth/users/me/`,
        method: 'PATCH',
        body: patch,
        headers: {
          Authorization: `Token ${localStorage.getItem(`${APP_NAME}Token`)}`
        }
      })
    }),
    getUserData: builder.query({
      query: () => ({
        url: 'auth/users/me/',
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem(`${APP_NAME}Token`)}`
        }
      })
    })
  })
})

export const {
  useRegisterUserMutation,
  useGetTokenMutation,
  useUpdateUserMutation,
  useGetUserDataQuery
} = simplereportsAPI
