import React from 'react';
import {Text, View, SafeAreaView, StatusBar} from 'react-native';
import {FormikResetPassword} from '../../../components';
import {useTheme} from '../../ThemeContext/ThemeContext';
const ResetPassword = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = themeStyle(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  return (
    <SafeAreaView style={themeStyle.Container}>
      <StatusBar hidden={false} />
      <Text style={themeStyle.title}>Reset Password</Text>
      <Text style={themeStyle.subtitle}>Set your new password</Text>

      {/* Use Formik form here */}
      <FormikResetPassword navigation={navigation} />
    </SafeAreaView>
  );
};

export default ResetPassword;
