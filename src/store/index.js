import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { globalReducer, setMode } from './slices/globalSlice';
import {
  whatsappApi,
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
} from './apis/whatsappApi';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [whatsappApi.reducerPath]: whatsappApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(whatsappApi.middleware),
});
setupListeners(store.dispatch);

export {
  store,
  setMode,
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
};
