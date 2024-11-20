import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: theme.background,
    },
    subcontainer: {
      width: '85%',

      gap: 10,
      alignSelf: 'center',
    },

    title: {
      fontWeight: '700',
      fontSize: 24,
      color: theme.primary,
      marginTop: 20,
    },
    subtitle: {
      fontWeight: '400',
      fontSize: 14,
      color: theme.primary,
    },
    inputContainer: {
      width: 327,
      height: 292,
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
      color: theme.primary,
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
      backgroundColor: '#091155',
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 20,
    },
    signUpButtonText: {
      color: 'white',
      fontWeight: 'bold',
      marginRight: 5,
    },
    orText: {
      textAlign: 'center',
      color: 'grey',
      marginVertical: 20,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    socialButton: {
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 10,
      top: 28,
    },
    socialIcon: {
      width: 24,
      height: 24,
    },
    signInText: {
      textAlign: 'center',
      color: 'gray',
    },
    signInLink: {
      color: theme.primary,
      lineHeight: 28,
    },
    passwordtext: {
      textAlign: 'right',
    },
    passwordlink: {
      textAlign: 'right',
      color: theme.primary,
      fontSize: 14,

      marginTop: 5,
    },
  });

export default styles;
