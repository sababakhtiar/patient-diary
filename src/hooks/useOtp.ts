// import {  useSelector } from 'react-redux';
// import { RootState } from '../redux/store'; 
// import { verifyOtpAction, resendOtpAction } from '../redux/slices/authSlice';
// import { useAppDispatch } from './useDispatch';
// export const useOtp = () => {
//     const dispatch = useAppDispatch();

//   const { otp, loading, resending, error } = useSelector((state: RootState) => state.otp);

//   const handleChange = (index: number, value: string) => {

   
//     if (value.length <= 1) {
//       let newOtp = [...otp];
//       newOtp[index] = value;
//       dispatch({ type: 'otp/setOtp', payload: newOtp });
//     }
//   };

//   const handleSubmit = async (mobileNo: string, otpString: string) => {
//     dispatch(verifyOtpAction({ mobileNo, otp: otpString }));
//   };

//   const handleResendOtp = async (mobileNo: string) => {
//     dispatch(resendOtpAction(mobileNo));
//   };

//   return {
//     otp,
//     loading,
//     resending,
//     error,
//     handleChange,
//     handleSubmit,
//     handleResendOtp,
//   };
// };
