import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {FormikForgetPassword} from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../ThemeContext/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const ForgetPassword = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={themeStyle.Container}>
      <StatusBar hidden={false} />
      <View style={themeStyle.subcontainer}>
        <Text style={themeStyle.title}>Forget Password</Text>
        <Text style={themeStyle.subtitle}>Enter your details to get OTP</Text>

        <FormikForgetPassword navigation={navigation} />

        <TouchableOpacity
          style={themeStyle.backContainer}
          onPress={() => navigation.navigate('LogIn')}>
          <Text style={themeStyle.text}>
            <Ionicons
              name="arrow-back"
              size={14}
              color="grey"
              style={themeStyle.icon}
            />
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
