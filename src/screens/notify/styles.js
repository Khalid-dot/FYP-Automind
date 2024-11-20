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

      marginTop: 40,
      width: 347,
      height: 60,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    backButton: {
      backgroundColor: colors.backButton,
      justifyContent: 'center',
      alignItems: 'center',
      width: 42,
      height: 42,
      borderRadius: 10,
      marginRight: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.primary,
      marginLeft: 30,
    },
    notificationList: {
      paddingHorizontal: 20,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },
    weatherIcon: {
      width: 40,
      height: 40,
      marginRight: 15,
      top: 23,
      borderRadius: 19,
      backgroundColor: colors.backButton,
    },
    weatherDetails: {
      width: 271,
      height: 54,
      top: 20,
      flex: 1,
    },
    weatherTitle: {
      width: 271,
      top: 10,
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 10,
    },
    weatherTemp: {
      width: 271,
      fontWeight: '400',
      fontSize: 14,
      color: theme.primary,
      marginBottom: 5,
    },
    weatherDate: {
      fontWeight: '400',
      fontSize: 12,
      color: colors.textSecondary,
    },
    clearButton: {
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      top: 10,
      marginLeft: 300,
    },
    clearButtonText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '700',
    },
  });

export default styles;
