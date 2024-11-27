
import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },

    backButton: {
      backgroundColor: colors.backButton,
      marginTop: 20,
      flexDirection: 'row',
      width: 42,
      height: 42,
      marginLeft: 12,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 2.5,
      paddingBottom: 2.5,
      borderRadius: 8,
    },
    backicon: {
      width: 26,
      height: 26,
      marginLeft: 6,
      alignSelf: 'center',
      top: 5,
      justifyContent: 'center',
    },

    title: {
      color: theme.primary,
      fontWeight: 'bold',
      width: 250,
      height: 60,
      marginLeft: 20,
      fontSize: 25,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 16,
      marginTop: 30,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    serialNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2a2a2a',
      marginBottom: 16,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },

    iconLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelText: {
      fontSize: 14,
      color: '#6b6b6b',
      marginLeft: 8,
    },
    icon: {
      marginRight: 8,
    },
    outputBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: '#f8f8f8',
      minWidth: 100,
      alignItems: 'center',
    },
    outputText: {
      fontSize: 14,
      color: '#091155',
      fontWeight: 'bold',
    },
    icon: {
      marginRight: 8,
    },
  });

export default styles;
