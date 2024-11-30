import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Switch, Image, Dimensions } from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Automind } from '../../assets'; // Light mode logo
import { AutomindD } from '../../assets'; // Dark mode logo
import { useTheme } from '../ThemeContext/ThemeContext';

const { width, height } = Dimensions.get('window');  // Get screen dimensions

const Setting = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const themeStyle = styles(theme);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LogIn' }],
            });
          } 
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={[themeStyle.container, { paddingHorizontal: width * 0.05 }]}>
      {/* Logo */}
      <View style={themeStyle.titleBox}>
        <Image 
          source={isEnabled ? AutomindD : Automind} // Conditionally render logo based on dark mode state
          style={[themeStyle.logoImage, { width: width * 0.9, height: height * 0.4 }]} 
        />
      </View>

      {/* Profile Settings */}
      <TouchableOpacity style={[themeStyle.optionContainer, { paddingVertical: height * 0.02 }]}
      onPress={() => navigation.navigate('AccountSetting')}
      >
        <View style={themeStyle.iconContainer}>
          <Ionicons name="person-outline" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, { fontSize: width * 0.040 }]}>Profile Settings</Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity style={[themeStyle.optionContainer, { paddingVertical: height * 0.02 }]}
      onPress={() => navigation.navigate('Notification')}
      >
        <View style={themeStyle.iconContainer}>
          <Ionicons name="notifications-outline" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, { fontSize: width * 0.040 }]}>Notifications</Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={[themeStyle.optionContainer, { paddingVertical: height * 0.02 }]}
      onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <View style={themeStyle.iconContainer}>
          <Ionicons name="shield-outline" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, { fontSize: width * 0.040 }]}>Privacy Policy</Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Terms & Conditions */}
      <TouchableOpacity style={[themeStyle.optionContainer, { paddingVertical: height * 0.02 }]}
      onPress={() => navigation.navigate('TermsCondition')}
      >
        <View style={themeStyle.iconContainer}>
          <Ionicons name="clipboard-outline" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, { fontSize: width * 0.040 }]}>Terms & Conditions</Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Dark Mode Switch */}
      <View style={[themeStyle.optionContainer, { paddingVertical: height * 0.02 }]}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="sunny-sharp" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, { fontSize: width * 0.040 }]}>Switch to Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: 'black' }}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[themeStyle.optionContainer, themeStyle.logoutContainer, { paddingVertical: height * 0.02 }]}
        onPress={handleLogout}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="log-out-outline" size={width * 0.06} color="#fff" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[themeStyle.optionText, themeStyle.logoutText, { fontSize: width * 0.040 }]}>Logout</Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
