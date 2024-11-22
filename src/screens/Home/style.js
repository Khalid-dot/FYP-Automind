import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: theme.background,
    },
    topImage: {
      width: 400,
      height: 251,
    },
    profile: {
      position: 'relative',
    },
    profileIconImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    topImage: {
      width: '100%',
      height: 200,
    },
    headerContainer: {
      width: 36,
      height: 36,
      position: 'absolute',
      top: 20,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#091155',
      borderRadius: 20,
    },
    profileicon: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      marginLeft: 6,
    },
    userName: {
      width: 100,

      fontSize: 16,
      fontWeight: '700',
      marginLeft: 10,
      color: '#FFFF',
    },
    notificationButton: {
      width: 36,
      height: 35,
      marginLeft: 170,
      backgroundColor: '#E6E7EE',
      borderRadius: 20,
      padding: 5,
    },
    notificationIcon: {
      marginLeft: 3,
    },
    bannerContainer: {
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#D0C2E9',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      overflow: 'hidden',
      marginLeft: 15,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    bannerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2F2F2F',
      left: 17.21,
      marginBottom: 10,
    },
    inspectButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 20,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 50,
      paddingRight: 20,
      flexDirection: 'row',
    },
    icon: {
      flexDirection: 'row',
      marginLeft: 5,
    },
    inspectButtonText: {
      color: 'white',
      fontWeight: '700',
    },
    bannerImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginLeft: 20,
    },

    optionButton: {
      width: '90%',
      height: 96,
      backgroundColor: '#E6E7EE',
      borderRadius: 16,
      padding: 20,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 50,
      marginTop: 30,
      marginLeft: 15,
    },
    optionIcon: {
      width: 48,
      height: 48,
      marginRight: 20,
    },
    optionText: {
      fontSize: 18,
      color: '#1A237E',
      fontWeight: '600',
    },
  });

export default styles;