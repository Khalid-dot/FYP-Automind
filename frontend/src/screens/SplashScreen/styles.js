import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,

      color: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 812,
    },
  });
export default styles;
