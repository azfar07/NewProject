// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice"; // ← your RTK Query slice

export const store = configureStore({
  reducer: {
    // mount the RTK Query reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) =>
    // add the RTK Query middleware for caching, invalidation, polling, etc.
    getDefault().concat(apiSlice.middleware),
});
