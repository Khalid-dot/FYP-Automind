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
      gap: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.border,
      backgroundColor: 'red',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 8,
    },
    input: {
      width: 327,
      flex: 1,
      height: 44,
      paddingLeft: 10,
      marginLeft: 30,
      color: colors.inputText,
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
      fontWeight: 'bold',
      marginRight: 5,
    },
    orText: {
      textAlign: 'center',
      color: colors.textSecondary,
      marginVertical: 20,
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 30,
    },
    socialButton: {
      backgroundColor: colors.socialButtonBackground,
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
      color: theme.primary,
      lineHeight: 28,
    },
    signInLink: {
      color: theme.primary,
      lineHeight: 28,
    },
  });

export default styles;
