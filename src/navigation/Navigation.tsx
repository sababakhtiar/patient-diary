// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ApolloProvider } from '@apollo/client';
// import SignUp from '../screens/signUp/SignUp';
// import Login from '../screens/login/Login';
// import Dashboard from '../screens/dashboard/Dashboard';
// import OtpVerification from '../screens/otpVerification/OtpVerification';
// import client from '../apolloClient';  // Import the Apollo Client configuration
// import {RootStackParams} from '../types/types';
// export default function Navigation() {
//   const Stack = createNativeStackNavigator<RootStackParams>();


//   return (
//     <ApolloProvider client={client}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="OtpVerification" component={OtpVerification} />
//           <Stack.Screen name="Dashboard" component={Dashboard} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ApolloProvider>
//   );
// }



// Navigation.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import SignUp from '../screens/signUp/SignUp';
import Login from '../screens/login/Login';
import OtpVerification from '../screens/otpVerification/OtpVerification';
import SearchAppointment from "../screens/searchAppointment/SearchAppointment"
import AppNavigator from './BottomNavigation'; // Import your bottom tab navigator
import client from '../apolloClient';
import { RootStackParams } from '../types/types';

export default function Navigation() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          {/* Replace Dashboard with AppNavigator */}
          <Stack.Screen name="Dashboard" component={AppNavigator} />
          <Stack.Screen name="SearchAppointment" component={SearchAppointment} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
