import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const whatsappApi = createApi({
  reducerPath: 'whatsapp',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CHAT_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    startWhatsapp: builder.mutation({
      query: () => ({
        url: '/whatsapp/start',
        method: 'POST',
      }),
    }),
    stopWhatsapp: builder.mutation({
      query: () => ({
        url: '/whatsapp/stop',
        method: 'POST',
      }),
    }),
    statusWhatsapp: builder.query({
      query: () => ({
        url: '/whatsapp/status',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
} = whatsappApi;

export { whatsappApi };
