import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const whatsappApi = createApi({
  reducerPath: 'whatsapp',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
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
