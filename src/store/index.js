import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { globalReducer, setMode } from './slices/globalSlice';
import { authReducer, setCredentials, logOut } from './slices/authSlice';
import {
  whatsappApi,
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
} from './apis/whatsappApi';
import {
  authApi,
  useSigninMutation,
  useSignupMutation,
  useCurrentUserQuery,
} from './apis/authApi';
import {
  productApi,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useUpdateProductImageMutation,
} from './apis/productsApi';

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [whatsappApi.reducerPath]: whatsappApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(whatsappApi.middleware)
      .concat(authApi.middleware)
      .concat(productApi.middleware),
});
setupListeners(store.dispatch);

export {
  store,
  setMode,
  setCredentials,
  logOut,
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
  useSigninMutation,
  useSignupMutation,
  useCurrentUserQuery,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useUpdateProductImageMutation,
};
