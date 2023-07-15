import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
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
    createProduct: builder.mutation({
      invalidatesTags: (result, error, product) => {
        return [{ type: 'Product', id: 'LIST' }];
      },
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),
    getProducts: builder.query({
      providesTags: (result, error) => {
        const tags = result?.data.map((product) => {
          return { type: 'Product', id: product.id };
        });
        tags.push({ type: 'Product', id: 'LIST' });
        return tags;
      },
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getProduct: builder.query({
      providesTags: (result, error) => {
        return [{ type: 'Product', id: result?.data?.id }];
      },
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    updateProduct: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        return [{ type: 'Product', id }];
      },
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
    }),
    removeProduct: builder.mutation({
      invalidatesTags: (result, error, id) => {
        return [{ type: 'Product', id }];
      },
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
    updateProductImage: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        return [{ type: 'Product', id }];
      },
      query: ({ id, formData }) => ({
        url: `/products/image/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useUpdateProductImageMutation,
} = productApi;

export { productApi };
