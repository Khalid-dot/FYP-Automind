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

const FormikForgetPassword = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const handlePasswordReset = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Password Reset',
          'A password reset link has been sent to your email.',
        );
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        handlePasswordReset(values.email);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View>
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
              placeholder="Enter your email"
              value={values.email}
              placeholderTextColor={'grey'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {values.email.length > 0 && (
              <TouchableOpacity onPress={() => setFieldValue('email', '')}>
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

          <TouchableOpacity
            onPress={handleSubmit}
            style={themeStyle.signUpButton}>
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

      backgroundColor: theme.background,
    },

    text: {
      color: theme.primary,
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 40,
    },
    title: {
      color: theme.primary,
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: 40,
      fontSize: 25,
      fontFamily: fonts.regular,
    },
    subtitle: {
      fontSize: 14,
      color: theme.primary,
      fontFamily: fonts.regular,
      lineHeight: 40,
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
      flex: 1,
      height: 44,
      paddingLeft: 10,
      color: colors.inputText,
      fontFamily: fonts.regular,
    },
    icon: {
      marginRight: 10,
    },
    clearIcon: {
      marginLeft: 10,
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
      fontFamily: fonts.regular,
      fontWeight: 'bold',
      marginRight: 5,
    },
    signInLink: {
      color: colors.primary,
      textAlign: 'center',
      lineHeight: 300,
      fontSize: 14,
      marginTop: 5,
    },

    backContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    Text: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: fonts.regular,
      lineHeight: 250,
    },
    errorText: {
      color: colors.error,
    },
  });

export default FormikForgetPassword;
