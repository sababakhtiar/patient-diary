// import { useDispatch, useSelector } from 'react-redux';
// import { sendOtp } from '../redux/slices/loginSlice'; // async action
// import { RootState } from '../redux/store';
// import {useAppDispatch} from './useDispatch';
// export const useLoginWithMobile = () => {
//     const dispatch = useAppDispatch();
//   const { loading, error } = useSelector((state: RootState) => state.login); // Access state from the Redux slice

//   const handleLogin = (mobileNo: string) => {
//     if (!mobileNo || mobileNo.length < 13) {
//       throw new Error('Invalid Mobile Number');
//     }
//     dispatch(sendOtp({ mobileNo })); // Dispatch async action to send OTP
//   };

//   return {
//     handleLogin,
//     loading,
//     error,
//   };
// };
