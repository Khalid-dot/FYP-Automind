import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      marginBottom: 50,
      backgroundColor: theme.background,
    },

    title: {
      width: 110,
      height: 25,
      marginLeft: 21,
      marginTop: 10,
      color: theme.primary,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 25,
      fontSize: 25,
    },
    subtitle: {
      width: '90%',  // Adjusted for responsiveness to parent container
      fontSize: 14,  // Good for subtitles
      marginLeft: 21,  // Keeps left alignment
      color: theme.primary,  // Theming for text color
      lineHeight: 15,  // Adjust lineHeight for better readability
      marginTop: 10,  // Adds space above the subtitle
    },
    card: {
      width: 343,
      height: 205,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      paddingTop: 20,
      paddingRight: 16,
      paddingBottom: 20,
      paddingLeft: 16,
      elevation: 3,
      marginRight: 10,
      marginTop: 10,
      borderColor: colors.border,
      marginLeft: 21,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      backgroundColor: colors.backButton,
      padding: 10,
      borderRadius: 4,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 16,
    },
    cardTitle: {
      width: 127,
      height: 18,
      fontWeight: '700',
      color: '#0D1B34',
    },

    healthText: {
      width: 66,
      height: 18,
      fontSize: 12,
      fontWeight: '400',
      color: '#8696BB',
      marginTop: 5,
    },
    dateContainer: {
      alignItems: 'flex-end',
    },
    dateText: {
      width: 82,
      height: 21,
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    timeText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#8696BB',
      marginTop: 4,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    healthContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    healthLabel: {
      fontSize: 12,
      fontWeight: '400',
      color: '#8696BB',
      marginLeft: 10,
    },
    conditionContainer: {
      width: 311,
      height: 39,
      marginTop: 16,
      backgroundColor: '#E6E7EE',
      paddingTop: 12,
      paddingRight: 32,
      paddingBottom: 12,
      paddingLeft: 32,
      borderRadius: 8,
      alignItems: 'center',
    },
    conditionText: {
      width: 111,
      height: 20,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      color: colors.textPrimary,
    },

    clearButton: {
      borderRadius: 15,
      alignItems: 'flex-end',
      top: -2,
      marginRight: 28,
    },
    clearButtonText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '700',
    },

  });

export default styles;
