import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Switch, Image} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Automind} from '../../assets';
import {LOGO_IMAGE} from '../../assets';
import {useTheme} from '../ThemeContext/ThemeContext';

const Setting = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

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
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LogIn'}],
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.titleBox}>
        {/* <Text style={themeStyle.title}>AUTOMIND</Text> */}
        <Image source={Automind} style={themeStyle.logoImage} />
      </View>

      <TouchableOpacity
        style={themeStyle.optionContainer}
        onPress={() => navigation.navigate('AccountSetting')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </View>
        <Text style={themeStyle.optionText}>Profile Settings</Text>
        <Ionicons name="arrow-forward" size={20} color="#B4B4B4" />
      </TouchableOpacity>

      <TouchableOpacity
        style={themeStyle.optionContainer}
        onPress={() => navigation.navigate('Notification')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>
        <Text style={themeStyle.optionText}>Notifications</Text>
        <Ionicons name="arrow-forward" size={20} color="#B4B4B4" />
      </TouchableOpacity>

      <TouchableOpacity
        style={themeStyle.optionContainer}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="shield-outline" size={24} color="#fff" />
        </View>
        <Text style={themeStyle.optionText}>Privacy Policy</Text>
        <Ionicons name="arrow-forward" size={20} color="#B4B4B4" />
      </TouchableOpacity>

      <TouchableOpacity
        style={themeStyle.optionContainer}
        onPress={() => navigation.navigate('TermsCondition')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="clipboard-outline" size={24} color="#fff" />
        </View>
        <Text style={themeStyle.optionText}>Terms & Conditions</Text>
        <Ionicons name="arrow-forward" size={20} color="#B4B4B4" />
      </TouchableOpacity>

      <View style={themeStyle.optionContainer}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="sunny-sharp" size={24} color="#fff" />
        </View>
        <Text style={themeStyle.optionText}>Switch to Dark Mode</Text>
        <View style={themeStyle.switchContainer}>
          <Switch
            // trackColor={{false: colors.border, true: colors.primary}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[themeStyle.optionContainer, themeStyle.logoutContainer]}
        onPress={handleLogout}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </View>
        <Text style={[themeStyle.optionText, themeStyle.logoutText]}>
          Logout
        </Text>
        <Ionicons name="arrow-forward" size={20} color="#B4B4B4" />
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
