import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from './styles';
import { colors } from '../../constants';

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    system: false,
    other: true,
  });
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const themeStyle = styles(theme);

  // Load notification preference from AsyncStorage
  useEffect(() => {
    const loadNotificationSettings = async () => {
      const savedNotifications = await AsyncStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    };
    loadNotificationSettings();
  }, []);

  // Save notification preference to AsyncStorage and update state immediately
  const handleToggle = async (type) => {
    const newState = { ...notifications, [type]: !notifications[type] };

    // Update the state immediately
    setNotifications(newState);

    // Persist state in AsyncStorage
    await AsyncStorage.setItem('notifications', JSON.stringify(newState));
  };

  const handleNavigation = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      Alert.alert('Navigation Error', 'Unable to navigate to the selected screen.');
<<<<<<< HEAD
=======
      console.error('Navigation Error:', error);
>>>>>>> 604d6dc (Updated Code F)
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
          trackColor={{ false: colors.border, true: colors.primary }}
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