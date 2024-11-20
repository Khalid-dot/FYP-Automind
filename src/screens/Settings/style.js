import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    titleBox: {
      width: 395,
      height: 60,
      top: 42,
    },
    title: {
      width: 81,
      height: 32,
      top: 15,
      left: 147,
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 32,
      color: theme.primary,
    },
    optionContainer: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      marginBottom: 12,
      borderRadius: 16,
      borderWidth: 1,
      top: 70,
      borderColor: colors.border,
      width: '95%',
      // marginLeft: 20,
      gap: 10,
      alignSelf: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    optionText: {
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
      color: 'black',
      lineHeight: 20,
    },
    switchContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      padding: 2,
    },
    switch: {
      transform: [{scaleX: 1.1}, {scaleY: 1.1}],
    },
  });

export default styles;
