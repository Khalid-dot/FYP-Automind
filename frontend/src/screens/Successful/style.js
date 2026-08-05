import {StyleSheet, Text, View} from 'react-native';
import colors from '../../constants/colors';

const styles = theme =>
  StyleSheet.create({
    Container: {
      flex: 1,

      color: colors.backButton,
      backgroundColor: theme.background,
    },
    socialicon: {
      width: 120,
      height: 120,
      top: 250,
      left: 120,
      gap: 50,
      alignItems: 'center',
    },
    title: {
      width: 235,
      height: 20,
      top: 250,
      left: 60,
      color: theme.primary,
      fontsize: 30,
      lineheight: 70,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      width: 235,
      height: 20,
      top: 250,
      left: 100,
      color: theme.primary,
      justifyContent: 'center',
      fontsize: 14,
      fontweight: 400,
      lineheight: 20,
      textalign: 'center',
    },
  });

export default styles;
