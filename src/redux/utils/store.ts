import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";

// TODO: Store all the states
const store = configureStore({
  reducer: {
    //auth
    //cart
    product: productReducer,
  },
});

// TODO: Type of all the states I have in the current project
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
