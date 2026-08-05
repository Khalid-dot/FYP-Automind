import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = theme =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      color: '#091155',
      fontSize: 12,
      alignItems: 'center',
      lineHeight: 40,
      marginTop: 80,
      flexDirection: 'row',
    },
    icon: {
      marginLeft: 30,
      marginTop: 10,
    },
    subcontainer: {
      width: '85%',
      gap: 10,
      alignSelf: 'center',
    },
    title: {
      // color: '#091155',
      // fontStyle: 'normal',
      // fontWeight: 'bold',
      // lineHeight: 40,
      // fontSize: 25,
      fontWeight: '700',
      fontSize: 24,
      color: theme.primary,
      marginTop: 20,
    },

    subtitle: {
      fontSize: 14,
      color: 'grey',
      lineHeight: 40,
      color: theme.primary,
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
      color: '#333',
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
    signInLink: {
      color: '#091155',
      textAlign: 'center',
      lineHeight: 300,
      fontSize: 14,
      marginTop: '5',
    },

    backContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    Text: {
      fontSize: 14,
      color: theme.primary,
      marginTop: 100,
    },
  });

export default styles;
