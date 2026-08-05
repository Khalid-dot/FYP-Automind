import {StyleSheet, Text} from 'react-native';
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

      borderRadius: 10,
      paddingHorizontal: 10,

      alignSelf: 'center',
    },
    backButton: {
      backgroundColor: colors.backButton || '#E8E9F2',
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
      marginLeft: 0,
    },
    containerWrapper: {
      width: 340,
      heightL: 14,
      top: 50,
      marginLeft: 18,
    },
    Text: {
      width: 340,
      height: 24,
      fontWeight: '600',
      fontSize: 16,
      color: theme.primary,
      // textAlign: 'center',
      marginLeft:30,
    },
    heading: {
      fontWeight: '600',
      fontSize: 14,
      color: colors.title,
      marginTop: 15,
      marginBottom:5,
      marginLeft:30,

    },
    subtitle: {
      fontWeight: '400',
      fontSize: 11,
      color: theme.primary,
      marginLeft:30,
      marginRight:30,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft:30,
    },
    bullet: {
      fontSize: 20,
      lineHeight: 22,
      marginRight: 5,
    },
  });
export default styles;
