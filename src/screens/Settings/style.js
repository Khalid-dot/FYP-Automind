import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    titleBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '395',
      height: 42,
      marginTop: 30,
    },
    logoImage: {
      width: 350,
      height: 250,
      resizeMode: 'contain',
      top: 20,
    },

    title: {
      fontWeight: '700',
      fontSize: 40,
      lineHeight: 52,
      top: 10,
      marginRight: 20,
      // marginTop: 1,
      left: 10,
      color: theme.primary,
      fontFamily: fonts.bebas,
      // fontStyle: 'italic',
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
      fontSize: 16,
      fontWeight: '600',
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