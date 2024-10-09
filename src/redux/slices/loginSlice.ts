// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import client from "../../apolloClient"; 
// import { LOGIN_WITH_MOBILE } from '../../graphql/mutations/LoginwithMobile';

// // Async action for sending OTP
// export const sendOtp = createAsyncThunk(
//   'auth/sendOtp',
//   async ({ mobileNo }: { mobileNo: string }, thunkAPI) => {
//     try {
//       const response = await client.mutate({
//         mutation: LOGIN_WITH_MOBILE,
//         variables: { mobileNo },
//       });
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// interface AuthState {
//   loading: boolean;
//   error: string | null; // Allow both 'null' and 'string' for error
// }

// const initialState: AuthState = {
//   loading: false,
//   error: null,
// };

// const loginSlice = createSlice({
//   name: 'login',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Reset error on new request
//       })
//       .addCase(sendOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string; // TypeScript now accepts this
//       });
//   },
// });

// export default loginSlice.reducer;
