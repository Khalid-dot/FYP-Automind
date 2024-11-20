import React, {useEffect, useRef, useContext, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../UserContext/UserContext';
import styles from './style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {banner_Image, image, serial_image, Top_Image} from '../../assets';
import {useTheme} from '../ThemeContext/ThemeContext';

const HomePage = ({navigation}) => {
  const {userData} = useContext(UserContext); // Use UserContext to get userData
  const jumpAnimation = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

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

  return (
    <SafeAreaView style={themeStyle.container}>
      <View style={themeStyle.profile}>
        <Image source={Top_Image} style={themeStyle.topImage} />

        <View style={themeStyle.headerContainer}>
          {userData?.profileImage ? (
            <Image
              source={{uri: userData.profileImage}}
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

          <Text style={themeStyle.userName}>
            {userData?.name || 'User Name'}
          </Text>

          <TouchableOpacity
            style={themeStyle.notificationButton}
            onPress={() => navigation.navigate('notify')}>
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
          <Text style={themeStyle.bannerText}>
            Get your tyre inspection Now!
          </Text>

          <Animated.View style={{transform: [{translateY: jumpAnimation}]}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={themeStyle.inspectButton}>
              <Text style={themeStyle.inspectButtonText}>Inspect Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Image source={banner_Image} style={themeStyle.bannerImage} />
      </View>

      <TouchableOpacity
        style={themeStyle.optionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('InspectionViaImage')}>
        <Image source={image} style={themeStyle.optionIcon} />
        <Text style={themeStyle.optionText}>Inspect Via Images</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={themeStyle.optionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('InspectionViaSerial')}>
        <Image source={serial_image} style={themeStyle.optionIcon} />
        <Text style={themeStyle.optionText}>Inspect Via Serial Number</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;
