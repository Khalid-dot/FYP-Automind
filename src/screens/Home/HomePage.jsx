import React, { useState, useEffect, useContext, useRef } from 'react';
import { SafeAreaView, View, Text, Image, Animated, TouchableOpacity, Alert, BackHandler, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../UserContext/UserContext';
import { useTheme } from '../ThemeContext/ThemeContext';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { banner_Image, image, serial_image, Top_Image } from '../../assets';

const HomePage = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const jumpAnimation = useRef(new Animated.Value(0)).current; // Correct usage of useRef
  const [isEnabled, setIsEnabled] = useState(false);
  const [notification, setNotification] = useState(null);
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  // Load notification preference from AsyncStorage when the component mounts
  useEffect(() => {
    const loadNotificationSettings = async () => {
      const savedNotifications = await AsyncStorage.getItem('notifications');
      if (savedNotifications) {
        const { system } = JSON.parse(savedNotifications);
        setIsEnabled(system); // Set switch state from AsyncStorage
      }
    };
    loadNotificationSettings();

    // Listen for changes in notification settings
    const subscribeToNotifications = async () => {
      await AsyncStorage.getItem('notifications').then((data) => {
        const parsedData = JSON.parse(data);
        setIsEnabled(parsedData?.system || false);  // Ensure the state reflects the latest change
      });
    };

    const interval = setInterval(subscribeToNotifications, 1000);  // Check every 1 second

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  // Fetch notifications from Firestore based on the state of the notification switch
  useEffect(() => {
    const fetchNotifications = async () => {
      if (isEnabled) {  // Only fetch notifications if switch is enabled
        try {
          const querySnapshot = await firestore().collection('PopUps').get();
          const notifications = querySnapshot.docs.map(doc => doc.data());

          if (notifications.length > 0) {
            // Function to display a notification for 3 seconds
            const displayNotification = (notification) => {
              return new Promise((resolve) => {
                setNotification(notification);

                setTimeout(() => {
                  setNotification(null); // Hide notification after 3 seconds
                  resolve();
                }, 3000); // 3000ms = 3 seconds
              });
            };

            const showNotifications = async () => {
              // Sequentially display notifications with a 10-second delay between them
              for (let i = 0; i < notifications.length; i++) {
                const notification = notifications[i];
                await displayNotification(notification);

                if (i < notifications.length - 1) {
                  await new Promise(resolve => setTimeout(resolve, 20000)); // Wait 10 seconds before next notification
                }
              }
            };

            showNotifications();
          }
        } catch (error) {
          
        }
      }
    };

    fetchNotifications();
  }, [isEnabled]);

  // Animation for the button press
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnimation, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad), // Use Easing here
        }),
        Animated.timing(jumpAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad), // Use Easing here
        }),
      ])
    ).start();
  }, []);

  // Handle hardware back press to show exit confirmation dialog
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [navigation]);

  return (
    <SafeAreaView style={themeStyle.container}>
      <View style={themeStyle.profile}>
        <Image source={Top_Image} style={themeStyle.topImage} />

        <View style={themeStyle.headerContainer}>
          {userData?.profileImage ? (
            <Image
              key={userData?.profileImage + Date.now()} // Force reload by adding a dynamic key
              source={{ uri: userData.profileImage }}
              style={themeStyle.profileIconImage}
            />
          ) : (
            <Ionicons
              name="person-outline"
              size={20}
              color="#fff"
              style={themeStyle.profileicon}
            />
          )}

          <View style={{ flexGrow: 1 }}>
            <Text style={themeStyle.userName} numberOfLines={1} ellipsizeMode="tail">
              {userData?.name || 'User Name'}
            </Text>
          </View>

          <TouchableOpacity
            style={themeStyle.notificationButton}
            onPress={() => navigation.navigate('notify')}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color="#091155"
              style={themeStyle.notificationIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={themeStyle.bannerContainer}>
        <View style={themeStyle.textContainer}>
          <Text style={themeStyle.bannerText}>Get your tyre inspection Now!</Text>

          <Animated.View style={{ transform: [{ translateY: jumpAnimation }] }}>
            <TouchableOpacity activeOpacity={0.7} style={themeStyle.inspectButton}>
              <Text style={themeStyle.inspectButtonText}>Inspect Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Image source={banner_Image} style={themeStyle.bannerImage} />
      </View>

      <TouchableOpacity
        style={themeStyle.optionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('InspectionViaImage')}
      >
        <Image source={image} style={themeStyle.optionIcon} />
        <Text style={themeStyle.optionText}>Inspect Via Images</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={themeStyle.optionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('InspectionViaSerial')}
      >
        <Image source={serial_image} style={themeStyle.optionIcon} />
        <Text style={themeStyle.optionText}>Inspect Via Serial Number</Text>
      </TouchableOpacity>

      {/* Render Notification */}
      {notification && (
        <View style={themeStyle.notificationContainer}>
          <Text style={themeStyle.notificationTitle}>{notification.Title}</Text>
          <Text style={themeStyle.notificationMessage}>{notification.Message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomePage;