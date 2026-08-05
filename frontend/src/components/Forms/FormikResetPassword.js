import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import auth from '@react-native-firebase/auth';
import {useTheme} from '../../screens/ThemeContext/ThemeContext';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter and one special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const FormikResetPassword = ({route, navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = themeStyle(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const {oobCode} = route.params;

  const handlePasswordReset = password => {
    auth()
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        Alert.alert('Success', 'Password has been reset successfully.');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <Formik
      initialValues={{password: '', confirmPassword: ''}}
      validationSchema={validationSchema}
      onSubmit={values => handlePasswordReset(values.password)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={themeStyle.Container}>
          {/* Password Input */}
          <Text style={themeStyle.text}>Password</Text>
          <View style={themeStyle.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="grey"
              style={themeStyle.icon}
            />
            <TextInput
              style={themeStyle.input}
              placeholder="*******"
              secureTextEntry
              placeholderTextColor={'grey'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={themeStyle.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <Text style={themeStyle.text}>Confirm Password</Text>
          <View style={themeStyle.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="grey"
              style={themeStyle.icon}
            />
            <TextInput
              style={themeStyle.input}
              placeholder="*******"
              secureTextEntry
              placeholderTextColor={'grey'}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={themeStyle.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={themeStyle.signUpButton}
            onPress={handleSubmit}>
            <Text style={themeStyle.signUpButtonText}>Submit</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
const styles = theme =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: theme.primary,
    },
    text: {
      color: colors.textPrimary,
      fontSize: 14,
      lineHeight: 40,
      fontFamily: fonts.regular,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 10,
      marginBottom: 15,
      borderRadius: 8,
      fontFamily: fonts.regular,
    },
    input: {
      flex: 1,
      height: 44,
      paddingLeft: 10,
      color: colors.inputText,
      fontFamily: fonts.regular,
    },
    icon: {
      marginRight: 10,
    },
    signUpButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 20,
    },
    signUpButtonText: {
      color: colors.buttonText,
      fontWeight: 'bold',
      marginRight: 5,
      fontFamily: fonts.regular,
    },
    errorText: {
      color: colors.error,
      fontFamily: fonts.regular,
    },
  });

export default FormikResetPassword;
