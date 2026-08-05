import React, {useState} from 'react';
import {SafeAreaView, Text, StatusBar, View} from 'react-native';
import styles from './styles';
import {FormikLogIn} from '../../components';
import {useTheme} from '../ThemeContext/ThemeContext';
const LogIn = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  return (
    <SafeAreaView style={themeStyle.container}>
      <StatusBar hidden={false} />
      <View style={themeStyle.subcontainer}>
        <Text style={themeStyle.title}>Login</Text>
        <Text style={themeStyle.subtitle}>Enter your details to login</Text>

        {/* Use Formik form here */}
        <FormikLogIn navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
