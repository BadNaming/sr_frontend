import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../../utils/constants'

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
    })
  })
})

export const { useRegisterUserMutation } = simplereportsAPI
