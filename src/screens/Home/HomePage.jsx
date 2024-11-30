import React, { useEffect, useRef, useContext, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Animated, Easing, BackHandler, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../UserContext/UserContext';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { banner_Image, image, serial_image, Top_Image } from '../../assets';
import { useTheme } from '../ThemeContext/ThemeContext';
import firestore from '@react-native-firebase/firestore'; // Correct import for Firestore

const HomePage = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const jumpAnimation = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const themeStyle = styles(theme);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  const [notification, setNotification] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications from Firestore collection 'PopUps'
        const querySnapshot = await firestore().collection('PopUps').get();
        const notifications = querySnapshot.docs.map(doc => doc.data());

        if (notifications.length > 0) {
          // Function to display a notification for 3 seconds
          const displayNotification = (notification) => {
            return new Promise((resolve) => {
              // Set the notification to state
              setNotification(notification);

              // Hide the notification after 3 seconds
              setTimeout(() => {
                setNotification(null); // Hide the notification
                resolve(); // Resolve promise after 3 seconds
              }, 3000); // 3000ms = 3 seconds
            });
          };

          // Function to show notifications with proper timing
          const showNotifications = async () => {
            // We use a for loop to ensure notifications are shown sequentially
            for (let i = 0; i < notifications.length; i++) {
              const notification = notifications[i];
              // console.log("Fetched Notification:", notification);

              // Display the notification and wait for 3 seconds (when it disappears)
              await displayNotification(notification);

              // Wait 10 seconds before showing the next notification
              if (i < notifications.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 10 seconds before next notification
              }
            }
          };

          // Start showing notifications sequentially
          showNotifications();
        } else {
          // console.log('No notifications found.');
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications(); // Fetch notifications when the component mounts
  }, []); // Empty dependency array to run only once

  
  

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnimation, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(jumpAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
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
