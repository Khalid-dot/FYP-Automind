import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../ThemeContext/ThemeContext';
import styles from './styles';
import {colors} from '../../constants';
const Notification = ({navigation}) => {
  const [notifications, setNotifications] = useState({
    system: false,
    other: true,
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  const handleToggle = type => {
    setNotifications(prev => ({...prev, [type]: !prev[type]}));
  };

  const handleNavigation = screen => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      Alert.alert(
        'Navigation Error',
        'Unable to navigate to the selected screen.',
      );
      console.error('Navigation Error:', error);
    }
  };

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.textBox}>
        <TouchableOpacity
          style={themeStyle.backButton}
          onPress={() => handleNavigation('Setting')}
          accessible={true}
          accessibilityLabel="Go Back">
          <Ionicons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>
        <Text style={themeStyle.title}>Notification</Text>
      </View>

      <View style={themeStyle.notificationRow}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="phone-portrait-outline" size={18} color="#fff" />
        </View>
        <Text style={themeStyle.notificationText}>System Notification</Text>
        <Switch
          trackColor={{false: colors.border, true: colors.primary}}
          thumbColor={notifications.system ? '#ffffff' : '#f4f3f4'}
          onValueChange={() => handleToggle('system')}
          value={notifications.system}
          style={themeStyle.switch}
          accessible={true}
          accessibilityLabel="Toggle System Notifications"
        />
      </View>
    </View>
  );
};

export default Notification;
