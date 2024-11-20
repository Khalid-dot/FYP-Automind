import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    backButton: {
      backgroundColor: colors.backButton || '#E8E9F2',
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
    icon: {
      width: 16,
      height: 16,
      marginLeft: 15,
      alignSelf: 'center',
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
    subtitle: {
      textAlign: 'center',
      fontSize: 24,
      color: theme.primary,
      marginTop: 20,
      fontWeight: '700',
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 30,
      justifyContent: 'center',
    },
    gridButton: {
      width: 140,
      height: 140,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      margin: 10,
      position: 'relative',
    },
    gridImage: {
      gridImage: {
        width: '100',
        height: '100',
        borderRadius: 8,
        resizeMode: 'cover',
        backgroundColor: '#E0E0E0',
      },
    },
    buttonText: {
      fontSize: 30,
      color: '#6b6b6b',
    },
    deleteButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    checkbutton: {
      backgroundColor: '#091155',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 20,
    },
    checkbuttonText: {
      fontSize: 18,
      color: 'white',
      marginRight: 8,
      fontWeight: '600',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
    },
    modalButtonText: {
      fontSize: 18,
      marginLeft: 10,
      color: '#091155',
    },
    modalIcon: {
      marginLeft: 5,
    },
    modalCancelButton: {
      alignSelf: 'flex-end',
      marginTop: 20,
    },
    modalCancelText: {
      fontSize: 18,
      color: 'red',
    },
  });

export default styles;
