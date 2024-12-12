import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const styles = (theme) =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: theme.background || colors.background,
    },
    subcontainer: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary || colors.primary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.text || colors.text,
      marginBottom: 20,
    },
    listContainer: {
      paddingBottom: 20,
    },
    itemContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    itemTitle: {
      fontSize: 16,
      color: theme.text || colors.text,
      marginTop: 10,
      textAlign: 'center',
    },
    productName: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 8,
      lineHeight: 20,
      color: '#000',
    },
    itemPrice: {
      fontSize: 14,
      color: theme.text || colors.text,
      marginTop: 5,
      textAlign: 'center',
    },
    placeholderImage: {
      width: 150,
      height: 150,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      color: '#999',
    },
    backContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: theme.buttonBackground || colors.buttonBackground,
      borderRadius: 5,
      alignItems: 'center',
    },
    backText: {
      fontSize: 16,
      color: theme.buttonText || colors.buttonText,
    },
    loadingText: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.text || colors.text,
    },
  });

export default styles;
