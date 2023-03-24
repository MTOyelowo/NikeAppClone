import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { productsSlice } from "./productSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
