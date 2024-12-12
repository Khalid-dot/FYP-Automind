import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {google, bi_apple} from '../../assets';
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {useTheme} from '../../screens/ThemeContext/ThemeContext';

const {width, height} = Dimensions.get('window');

// Validation schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const FormikCreateAccount = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Configure Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '99208573863-g3t7cebkcb7d6kg2l1f6d7mdkdkr080i.apps.googleusercontent.com',
    });
  }, []);

  const handleRegister = async (fullname, email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
  
      if (user.emailVerified) {
        navigation.navigate('LogIn');
      } else {
        await user.sendEmailVerification();
        navigation.navigate('LogIn');
      }
  
      setMessage(
        'Account created! A verification email has been sent. Please verify your email before signing in.',
      );
      Alert.alert(
        'Verification Email Sent',
        'Please check your inbox to verify your email address.',
      );
  
      await auth().signOut();
      navigation.navigate('LogIn');
    } catch (err) {
      setMessage(err.message); // Set the error message in the state
    }
  };
  

  // Handle Google Sign-In
  const onGoogleButtonPress = async () => {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the user’s ID token
      const signInResult = await GoogleSignin.signIn();
      const {idToken} = signInResult?.data;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const user = await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google:', JSON.stringify(user, null, 2));
      navigation.navigate('BottomTabNavigator');
    } catch (error) {
      console.log('Error signing in with Google:', error.message);
      Alert.alert('Google Sign-In Error', error.message);
    }
  };

  const themeStyle = styles(theme);

  return (
    <Formik
      initialValues={{fullName: '', email: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        handleRegister(values.fullName, values.email, values.password);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          {/* Full Name Input */}
          <Text style={themeStyle.text}>Full Name</Text>
          <View style={themeStyle.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="grey"
              style={themeStyle.icon}
            />
            <TextInput
              style={themeStyle.input}
              placeholder="Enter Full Name"
              placeholderTextColor="grey"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            {values.fullName.length > 0 && (
              <TouchableOpacity onPress={() => handleChange('fullName')('')}>
                <Ionicons
                  name="close"
                  size={18}
                  color="#B5B5B5"
                  style={themeStyle.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          {touched.fullName && errors.fullName && (
            <Text style={themeStyle.errorText}>{errors.fullName}</Text>
          )}

          {/* Email Input */}
          <Text style={themeStyle.text}>Email</Text>
          <View style={themeStyle.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="grey"
              style={themeStyle.icon}
            />
            <TextInput
              style={themeStyle.input}
              placeholder="Enter Email"
              placeholderTextColor="grey"
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
              placeholder="Enter Password"
              placeholderTextColor="grey"
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


                {/* Display Error or Success Message */}
          {message ? (
          <Text style={themeStyle.errorText}>{message}</Text>
           ) : null}



          {/* Sign Up Button */}
          <TouchableOpacity
            style={themeStyle.signUpButton}
            onPress={handleSubmit}>
            <Text style={themeStyle.signUpButtonText}>Sign Up</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Social Sign-In Buttons */}
          <View style={themeStyle.separator}>
            <View style={themeStyle.line} />
            <Text style={themeStyle.orText}>OR</Text>
            <View style={themeStyle.line} />
          </View>
          <View style={themeStyle.socialButtons}>
            {/* Google Sign-In Button */}
            <TouchableOpacity
              style={themeStyle.socialButton}
              onPress={onGoogleButtonPress}>
              <Image source={google} style={themeStyle.socialIcon} />
            </TouchableOpacity>
            {/* Apple Sign-In Button (placeholder) */}
            <TouchableOpacity style={themeStyle.socialButton}>
              <Image source={bi_apple} style={themeStyle.socialIcon} />
            </TouchableOpacity>
          </View>

          {/* Sign In Redirect */}
          <Text style={themeStyle.signInText}>
            Already have an account?{' '}
            <Text
              style={themeStyle.signInLink}
              onPress={() => navigation.navigate('LogIn')}>
              Sign In
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
      fontFamily: fonts.regular,
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
      height: height * 0.06,
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
      paddingVertical: height * 0.02,
      borderRadius: 8,
    },
    signUpButtonText: {
      color: colors.buttonText,
      fontWeight: 'bold',
      marginRight: 2,
      marginTop: -2.8,
      fontSize:14.5,
      fontFamily: fonts.regular,
    },
    separator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: height * 0.03,
    },
    eyeIcon: {
      marginLeft: 10,
    },
    line: {
      height: 2,
      width: '43%',
      backgroundColor: colors.border,
    },
    orText: {
      marginHorizontal: 10,
      color: colors.textPrimary,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: height * 0.03,
    },
    socialButton: {
      backgroundColor: colors.socialButtonBackground,
      padding: width * 0.02,
      borderRadius: 8,
      marginHorizontal: width * 0.03,
    },
    socialIcon: {
      width: 24,
      height: 24,
    },
    signInText: {
      textAlign: 'center',
      color: theme.mainTitle,
      lineHeight: 28,
      fontFamily: fonts.regular,
    },
    signInLink: {
      color: theme.primary,
      lineHeight: 28,
    },
    errorText: {
      color: colors.error,
    },
    clearIcon: {
      color: '#B5B5B5',
    },
  });
export default FormikCreateAccount;
