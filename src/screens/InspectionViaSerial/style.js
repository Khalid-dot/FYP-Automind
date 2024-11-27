import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
    icon: {
      width: 26,
      height: 26,
      marginLeft: 6,
      alignSelf: 'center',
    },
    title: {
      color: theme.primary,
      fontWeight: 'bold',
      marginTop:-40,
      width: 250,
      height: 60,
      marginLeft: 70,
      fontSize: 25,
    },
    card: {
      width: '90%',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardIcon: {
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#091155',
      marginBottom: 5,
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#6b6b6b',
    },
    cardDivider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 10,
    },
    cardDetailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    cardDetailIcon: {
      marginRight: 8,
    },
    cardDetailText: {
      fontSize: 14,
      color: '#6b6b6b',
    },

    Text: {
      color: theme.primary,
      marginLeft: 44,
      lineHeight: 40,
      marginTop:20
    },
    inputContainer: {
      width: '85%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.border,
      padding: 10,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: 1,
    },
    input: {
      flex: 1,
      height: 44,
      paddingLeft: 10,
      color: colors.inputText,
    },
    checkbutton: {
      backgroundColor: colors.buttonBackground,
      width: '85%',
      height: 42,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 20,
    },
    checkbuttonText: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 14,
      color: colors.buttonText,
      marginRight: 10,
    },
    checkicon: {
      marginLeft: 10,
    },
    cameraicon: {
      marginLeft: 30,
    },
    selectedImage: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderBottomColor,
    },
    modalButtonText: {
      fontSize: 18,
      marginLeft: 10,
      color: colors.textPrimary,
    },
    modalCancelText: {
      fontSize: 18,
      color: colors.error,
    },
  });

export default styles;