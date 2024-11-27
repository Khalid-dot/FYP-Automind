import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    textBox: {
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: 20,
      width: 347,
      height: 60,
      borderRadius: 10,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: 25,
      color: theme.primary,
      fontWeight: 'bold',
      marginLeft: 30,
    },
    backButton: {
      backgroundColor: colors.backButton,
      justifyContent: 'center',
      alignItems: 'center',
      width: 42,
      height: 42,
      borderRadius: 10,
    },

    frame: {
      width: 327,
      marginTop: 30,
      gap: 24,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    frame1: {
      alignItems: 'center',
    },
    ellipse: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    icon: {
      width: 30,
      height: 30,
    },
    imagePreview: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    inputWrapper: {
      width: '90%',
      paddingHorizontal: 15,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.primary,
    },
    inputContainer: {
      width: '100%',
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      backgroundColor: colors.border,
      borderRadius: 12,
      marginBottom: 20,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: '100%',
      paddingLeft: 5,
      fontSize: 14,
      fontWeight: '400',

      color: '#000',
    },
    picker: {
      flex: 1,

      color: 'grey',
      marginLeft: 8,
    },
    clearIcon: {
      color: colors.textSecondary,
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: 20,

      borderRadius: 10,
      marginHorizontal: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderBottomColor,
    },
    modalButtonText: {
      fontSize: 18,
      marginLeft: 10,
      color: colors.textPrimary,
    },
    modalIcon: {
      marginLeft: 5,
    },
    modalCancelButton: {
      alignSelf: 'flex-end',
      marginTop: 20,
    },
    modalCancelText: {
      fontSize: 18,
      color: colors.error,
    },
    updateButton: {
      width: 327,
      backgroundColor: colors.buttonBackground,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',

      marginBottom: 20,
      alignSelf: 'center',
    },
    updateButtonText: {
      color: colors.buttonText,
      fontSize: 14,
      fontWeight: '700',
    },
  });

export default styles;
