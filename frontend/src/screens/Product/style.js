import {StyleSheet} from 'react-native';
const styles = theme =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      paddingBottom: 80,
    },
    title: {
      width: 110,
      height: 25,
      color: theme.primary,
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: 25,
      fontSize: 25,
      marginLeft: 21,
      marginTop: 10,
    },
    subtitle: {
      width: 318,
      height: 20,
      fontSize: 14,
      color: theme.primary,
      lineHeight: 25,
      // marginTop: 10,
      marginLeft: 21,
    },
    list: {
      justifyContent: 'center',
    },
    productContainer: {
      flex: 1,
      margin: 8,
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      alignItems: 'center',
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
      width: 163,
      height: 255,
    },
    productImage: {
      width: 146,
      height: 150,
      borderRadius: 16,
      top: 7.59,
    },
    productName: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 8,
      lineHeight: 20,
      color: '#000',
    },
    productPrice: {
      fontSize: 16,
      lineHeight: 19,
      color: '#1A237E',
    },
    placeholderImage: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
    placeholderText: {
      color: '#999',
      fontSize: 16,
    },
  });

export default styles;
