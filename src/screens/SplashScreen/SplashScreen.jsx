import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LOGO_IMAGE} from '../../assets';
import styles from './styles';
import {useTheme} from '../ThemeContext/ThemeContext';

const Splashscreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('CreateAccount');
    }, 1000);
  }, []);
  return (
    <View style={themeStyle.container}>
      <Image
        source={LOGO_IMAGE}
        style={themeStyle.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splashscreen;
