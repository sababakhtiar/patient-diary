// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
// import signupReducer from './slices/authSlice'; // Adjust the path based on your folder structure
// import loginReducer from "./slices/loginSlice"
import authReducer from "./slices/authSlice"
// import otpReducer from "./slices/otpSlice"
export const store = configureStore({
  reducer: {
    // signup: signupReducer, 
    // login: loginReducer,
    auth:authReducer,
    // otp:otpReducer
    // Add the signup slice here
    // Add other reducers here if needed
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
