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
  useSignoutMutation,
  useCurrentUserQuery,
} from './apis/authApi';

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [whatsappApi.reducerPath]: whatsappApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(whatsappApi.middleware)
      .concat(authApi.middleware),
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
  useSignoutMutation,
  useCurrentUserQuery,
};
