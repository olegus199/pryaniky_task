import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.ts";
import authTokenReducer from "../features/auth/authTokenSlice.ts";

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;