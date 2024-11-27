import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LogIn from './src/screens/LogIn/LogIn';
import ResetPassword from './src/screens/Passwords/Reset/ResetPassword';
import CreateAccount from './src/screens/CreateAccount/CreateAccount';
import Successful from './src/screens/Successful/Successful';
import ForgetPassword from './src/screens/Passwords/ForgetPassword/ForgetPassword';
import HomePage from './src/screens/Home/HomePage';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import InspectionViaImage from './src/screens/InspectionViaImage/InspectionViaImage';
import InspectionViaSerial from './src/screens/InspectionViaSerial/InspectionViaSerial';
import firebase from '@react-native-firebase/app';
import AccountSetting from './src/screens/AccountSetting/AccountSetting';
import Notification from './src/screens/Notification/Notification';
import TermsCondition from './src/screens/Terms&Conditions/TermsCondition';
import PrivacyPolicy from './src/screens/PrivacyPolicy/PrivacyPolicy';
import {ThemeProvider} from './src/screens/ThemeContext/ThemeContext';
import notify from './src/screens/notify/notify';
import ResultsViaSerialno from './src/screens/Results/ResultsViaSerialno';
import ResultsViaImage from './src/screens/Results/ResultsViaImage/ResultsViaImage';

import RecommendedProduct from './src/screens/RecommendedProduct/RecommendedProduct';
import Product from './src/screens/Product/Product';
import {UserProvider} from './src/screens/UserContext/UserContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyAjBFxyG6IQhcJ0l7oai4ivb140mlrx4LI',
  authDomain: 'automind-f061d.firebaseapp.com',
  projectId: 'automind-f061d',
  storageBucket: 'automind-f061d.appspot.com',
  messagingSenderId: '99208573863',
  appId: '1:99208573863:android:985b5f75c3e79c65ba3c82',
  databaseURL: 'https://automind-f061d.firebaseio.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
GoogleSignin.configure({
  webClientId:
    '99208573863-g3t7cebkcb7d6kg2l1f6d7mdkdkr080i.apps.googleusercontent.com',
});

const App = () => {
  const linking = {
    prefixes: ['https://automind.page.link'],
    config: {
      screens: {
        SplashScreen: 'splash',
        LogIn: 'login',
        ForgetPassword: 'forgot-password',
        ResetPassword: {
          path: 'reset-password/:oobCode',
          parse: {
            oobCode: oobCode => `${oobCode}`,
          },
        },
        CreateAccount: 'signup',
        Successful: 'success',
        HomePage: 'home',
        AccountSetting: 'account-settings',
        PrivacyPolicy: 'privacy-policy',
        TermsCondition: 'terms-condition',
        Notification: 'notifications',
      },
    },
  };

  return (
    <UserProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} />
              <Stack.Screen name="Successful" component={Successful} />
              <Stack.Screen name="HomePage" component={HomePage} />
              <Stack.Screen
                name="InspectionViaImage"
                component={InspectionViaImage}
              />
              <Stack.Screen
                name="InspectionViaSerial"
                component={InspectionViaSerial}
              />
              <Stack.Screen name="AccountSetting" component={AccountSetting} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="TermsCondition" component={TermsCondition} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="notify" component={notify} />
              <Stack.Screen name="Product" component={Product} />
              <Stack.Screen
                name="ResultsViaSerialno"
                component={ResultsViaSerialno}
              />
              <Stack.Screen
                name="ResultsViaImage"
                component={ResultsViaImage}
              />
              <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RecommendedProduct"
                component={RecommendedProduct}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    
    </UserProvider>
  );
};

export default App;
