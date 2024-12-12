
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Automind} from '../../assets'; // Light mode logo
import {AutomindD} from '../../assets'; // Dark mode logo
import {useTheme} from '../ThemeContext/ThemeContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const Setting = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme} = useTheme();
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

  const handleDeleteAccount = () => {
    setModalVisible(true); // Show modal for password input
  };

  const handleReauthenticationAndDelete = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        const credentials = auth.EmailAuthProvider.credential(
          user.email,
          password,
        );
        await user.reauthenticateWithCredential(credentials);

        await deleteAccount();
      } catch (error) {
        Alert.alert(
          'Error',
          'Re-authentication failed. Please check your password and try again.',
        );
      }
    }
  };

  const deleteAccount = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        const userRef = firestore().collection('users').doc(user.uid);
        await userRef.delete();
        

        await user.delete();
        

        navigation.reset({
          index: 0,
          routes: [{name: 'LogIn'}],
        });
      } catch (error) {
        Alert.alert(
          'Error',
          'There was an issue deleting your account. Please try again.',
        );
      }
    }
  };

  return (
    <View style={[themeStyle.container, {paddingHorizontal: width * 0.05}]}>
      {/* Logo */}
      <View style={themeStyle.titleBox}>
        <Image
          source={isEnabled ? AutomindD : Automind} // Conditionally render logo based on dark mode state
          style={[
            themeStyle.logoImage,
            {width: width * 0.9, height: height * 0.4},
          ]}
        />
      </View>

      {/* Profile Settings */}
      <TouchableOpacity
        style={[themeStyle.optionContainer, {paddingVertical: height * 0.02}]}
        onPress={() => navigation.navigate('AccountSetting')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="person-outline" size={width * 0.06} color="#fff" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[themeStyle.optionText, {fontSize: width * 0.04}]}>
            Profile Settings
          </Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
        style={[themeStyle.optionContainer, {paddingVertical: height * 0.02}]}
        onPress={() => navigation.navigate('Notification')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons
            name="notifications-outline"
            size={width * 0.06}
            color="#fff"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[themeStyle.optionText, {fontSize: width * 0.04}]}>
            Notifications
          </Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity
        style={[themeStyle.optionContainer, {paddingVertical: height * 0.02}]}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="shield-outline" size={width * 0.06} color="#fff" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[themeStyle.optionText, {fontSize: width * 0.04}]}>
            Privacy Policy
          </Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Terms & Conditions */}
      <TouchableOpacity
        style={[themeStyle.optionContainer, {paddingVertical: height * 0.02}]}
        onPress={() => navigation.navigate('TermsCondition')}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="clipboard-outline" size={width * 0.06} color="#fff" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[themeStyle.optionText, {fontSize: width * 0.04}]}>
            Terms & Conditions
          </Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Dark Mode Switch */}
      <View
        style={[themeStyle.optionContainer, {paddingVertical: height * 0.02}]}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="sunny-sharp" size={width * 0.06} color="#fff" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[themeStyle.optionText, {fontSize: width * 0.04}]}>
            Switch to Dark Mode
          </Text>
          <Switch
            trackColor={{false: '#767577', true: 'black'}}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[
          themeStyle.optionContainer,
          themeStyle.logoutContainer,
          {paddingVertical: height * 0.02},
        ]}
        onPress={handleLogout}>
        <View style={themeStyle.iconContainer}>
          <Ionicons name="log-out-outline" size={width * 0.06} color="#fff" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              themeStyle.optionText,
              themeStyle.logoutText,
              {fontSize: width * 0.04},
            ]}>
            Logout
          </Text>
          <Ionicons name="arrow-forward" size={width * 0.05} color="#B4B4B4" />
        </View>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            color: 'red',
            fontSize: 20,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Delete Account
        </Text>
      </TouchableOpacity>

      {/* Modal for Reauthentication */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text>Enter your password to confirm account deletion:</Text>

            <TextInput
              placeholder="Enter password"
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                marginTop: 10,
              }}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 10, marginTop: 20}}
              onPress={handleReauthenticationAndDelete}>
              <Text style={{color: 'white'}}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{padding: 10, marginTop: 10}}
              onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Setting;
