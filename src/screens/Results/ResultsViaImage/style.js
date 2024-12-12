import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

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
      marginLeft: 6, // Adjust to move the icon
      alignSelf: 'center',
    },
    tirepictureImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      resizeMode: 'cover', // To ensure the image fits within the box
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
      flexDirection: 'row',
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

    // icon: {
    //   width: 16,
    //   height: 16,
    //   marginLeft: 15,
    //   alignSelf: 'center',
    //   justifyContent: 'center',
    // },
    statusContainer: {
      flexDirection: 'row',
      width: 83,
      height: 24,
      borderRadius: 100,
    },

    statusContainer: {
      backgroundColor: '#E6F9EE',
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 12,
      marginLeft: 100,
    },

    statustext: {
      color: '#34C759',
      fontSize: 16,
      fontWeight: '600',
    },
    picturecontainer: {
      width: 331,
      height: 66,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tirepicture: {
      width: 68.75,
      height: 66,
      borderRadius: 8,
      backgroundColor: 'pink',
      gap: 12,
    },
    button: {
      width: 331,

      borderRadius: 8,
      paddingTop: 12,
      paddingRight: 32,
      paddingBottom: 12,
      paddingLeft: 32,
      gap: 8,
      backgroundColor: '#E6E7EE',
    },
    Textbutton: {
      width: 100,

      fontWeight: '500',
      fontSize: 14,
      color: '#091155',
      marginLeft: 80,
    },
  });

export default styles;
