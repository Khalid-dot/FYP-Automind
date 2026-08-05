import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

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
      backgroundColor: colors.backButton || '#E8E9F2',
      justifyContent: 'center',
      alignItems: 'center',
      width: 42,
      height: 42,
      borderRadius: 10,
      marginRight: 10,
    },
    title: {
      fontSize: 25,
      fontWeight: '600',
      color: theme.primary,
      marginLeft: 30,
    },
    notificationRow: {
      width: 343,
      marginLeft: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      marginTop: 40,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    iconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8,
      marginRight: 12,
    },
    notificationText: {
      fontSize: 14,
      fontWeight: '500',
      color: "#666666",
      width: 128,
      height: 20,
    },
    switch: {
      transform: [{scaleX: 1.1}, {scaleY: 1.1}],
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 16,
    },
  });

export default styles;
