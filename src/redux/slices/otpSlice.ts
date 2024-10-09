// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { VERIFY_OTP, RESEND_OTP } from '../../graphql/mutations/VerifyOtp';
// import client from '../../apolloClient'; // Assume Apollo client is setup

// interface OtpState {
//   otp: string[];
//   loading: boolean;
//   resending: boolean;
//   error: string | null;
// }

// const initialState: OtpState = {
//   otp: ['', '', '', '', ''],
//   loading: false,
//   resending: false,
//   error: null,
// };

// export const verifyOtpAction = createAsyncThunk(
//   'otp/verifyOtp',
//   async ({ mobileNo, otp }: { mobileNo: string; otp: string }, { rejectWithValue }) => {
//     try {
//       const response = await client.mutate({
//         mutation: VERIFY_OTP,
//         variables: { mobileNo, otp },
//       });
//       return response.data?.loginWithMobile;
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       return rejectWithValue('Failed to verify OTP');
//     }
//   }
// );

// export const resendOtpAction = createAsyncThunk(
//   'otp/resendOtp',
//   async (mobileNo: string, { rejectWithValue }) => {
//     try {
//       await client.mutate({
//         mutation: RESEND_OTP,
//         variables: { mobileNo },
//       });
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//       return rejectWithValue('Failed to resend OTP');
//     }
//   }
// );

// const otpSlice = createSlice({
//   name: 'otp',
//   initialState,
//   reducers: {
//     setOtp: (state, action) => {
//       state.otp = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//     .addCase(verifyOtpAction.pending, (state) => {
//       console.log('Verifying OTP - Pending');
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(verifyOtpAction.fulfilled, (state, action) => {
//       console.log('Verifying OTP - Fulfilled');
//       console.log('Response:', action.payload);
//       state.loading = false;
//       state.error = null;
//     })
//     .addCase(verifyOtpAction.rejected, (state, action) => {
//       console.error('Verifying OTP - Rejected');
//       console.error('Error:', action.payload);
//       state.loading = false;
//       state.error = action.payload as string || 'Failed to verify OTP';
//     })
//     .addCase(resendOtpAction.pending, (state) => {
//       console.log('Resending OTP - Pending');
//       state.resending = true;
//     })
//     .addCase(resendOtpAction.fulfilled, (state) => {
//       console.log('Resending OTP - Fulfilled');
//       state.resending = false;
//     })
//     .addCase(resendOtpAction.rejected, (state, action) => {
//       console.error('Resending OTP - Rejected');
//       console.error('Error:', action.payload);
//       state.resending = false;
//       state.error = action.payload as string || 'Failed to resend OTP';
//     });
//   },
// });

// export const { setOtp } = otpSlice.actions;
// export default otpSlice.reducer;
