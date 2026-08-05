import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {FormikCreateAccount} from '../../components';
import {useTheme} from '../ThemeContext/ThemeContext';

const CreateAccount = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  return (
    <SafeAreaView style={themeStyle.container}>
      <View style={themeStyle.subcontainer}>
        <Text style={themeStyle.title}>Create Account</Text>
        <Text style={themeStyle.subtitle}>
          Enter your details to create an account
        </Text>

        {/* Use Formik form here */}
        <FormikCreateAccount navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;
