import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {google, bi_apple} from '../../assets';
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';

import fonts from '../../constants/fonts';
import {useTheme} from '../../screens/ThemeContext/ThemeContext';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const FormikLogIn = ({navigation}) => {
  const [message, setMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  const onSubmitForm = async (email, password) => {
    try {
      console.log('Signing in with Email and Password:', email);
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      if (userCredential?.user?.emailVerified) {
        navigation.replace('BottomTabNavigator');
      } else {
        Alert.alert(
          'Please verify your email address before signing in. A verification email has been sent.',
        );
        await userCredential?.user?.sendEmailVerification();
        auth().signOut();
      }
    } catch (err) {
      console.log('Error signing in:', err.message);
      setMessage(err.message);
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSubmitForm(values.email, values.password);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={themeStyle.Container}>
          <Text style={themeStyle.text}>Email</Text>
          <View style={themeStyle.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="grey"
              style={themeStyle.icon}
            />
            <TextInput
              style={themeStyle.input}
              placeholder="Enter Email"
              placeholderTextColor={'grey'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {values.email.length > 0 && (
              <TouchableOpacity onPress={() => handleChange('email')('')}>
                <Ionicons
                  name="close"
                  size={18}
                  color="#B5B5B5"
                  style={themeStyle.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          {touched.email && errors.email && (
            <Text style={themeStyle.errorText}>{errors.email}</Text>
          )}

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
              placeholder="Enter Password"
              placeholderTextColor={'grey'}
              secureTextEntry={!showPassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={themeStyle.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && (
            <Text style={themeStyle.errorText}>{errors.password}</Text>
          )}

          {/* Display Login Error Message */}
          {message ? <Text style={themeStyle.errorText}>{message}</Text> : null}

          <Text style={themeStyle.passwordtext}>
            <Text
              style={themeStyle.passwordlink}
              onPress={() => navigation.navigate('ForgetPassword')}>
              Forget Password?
            </Text>
          </Text>

          <TouchableOpacity
            style={themeStyle.signUpButton}
            onPress={handleSubmit}>
            <Text style={themeStyle.signUpButtonText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{height: 2, width: '43%', backgroundColor: '#E8E8E8'}}
            />
            <Text style={{marginHorizontal: 10, color: '#000'}}>OR</Text>
            <View
              style={{height: 2, width: '43%', backgroundColor: '#E8E8E8'}}
            />
          </View>

          <View style={themeStyle.socialButtons}>
            <TouchableOpacity style={themeStyle.socialButton}>
              <Image source={google} style={themeStyle.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={themeStyle.socialButton}>
              <Image source={bi_apple} style={themeStyle.socialIcon} />
            </TouchableOpacity>
          </View>

          <Text style={themeStyle.signInText}>
            Don't have an account?{' '}
            <Text
              style={themeStyle.signInLink}
              onPress={() => navigation.navigate('CreateAccount')}>
              Create Account
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: theme.primary,
    },
    subcontainer: {
      width: '85%',

      gap: 10,
      alignSelf: 'center',
    },
    text: {
      color: theme.primary,
      fontSize: 14,
      lineHeight: 30,
    },
    title: {
      color: theme.primary,
      fontSize: 14,
      lineHeight: 40,
      fontFamily: fonts.regular,
    },
    subtitle: {
      fontWeight: '400',
      fontSize: 14,
      color: colors.textSecondary,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.border,
      paddingHorizontal: 10,
      marginBottom: 15,
      borderRadius: 8,
    },
    input: {
      width: 327,
      flex: 1,
      height: 44,
      paddingLeft: 10,
      color: colors.inputText,
      fontFamily: fonts.regular,
    },
    eyeIcon: {
      marginRight: 10,
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
      fontFamily: fonts.regular,
      marginRight: 5,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    socialButton: {
      backgroundColor: colors.socialButtonBackground,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    socialIcon: {
      width: 24,
      height: 24,
    },
    signInText: {
      textAlign: 'center',
      fontFamily: fonts.regular,
      color: colors.signInText,
    },
    clearIcon: {
      color: '#B5B5B5',
    },
    signInLink: {
      color: theme.primary,
      lineHeight: 28,
    },
    passwordtext: {
      color: theme.mainTitle,
      textAlign: 'right',
      fontFamily: fonts.regular,
    },
    passwordlink: {
      textAlign: 'right',

      color: theme.primary,
      fontSize: 14,
      marginTop: 5,
    },
    errorText: {
      color: colors.error,
      fontFamily: fonts.regular,
    },
  });

export default FormikLogIn;
