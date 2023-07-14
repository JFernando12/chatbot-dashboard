import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
    }),
    signup: builder.mutation({
      query: () => ({
        url: '/auth/signup',
        method: 'POST',
      }),
    }),
    currentUser: builder.query({
      query: () => ({
        url: '/auth/currentuser',
        method: 'GET',
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useCurrentUserQuery } =
  authApi;

export { authApi };
