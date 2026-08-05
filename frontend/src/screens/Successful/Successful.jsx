import {View, Image, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {tick} from '../../assets';
import themeStyle from './style';
import {useTheme} from '../ThemeContext/ThemeContext';

const Successful = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = themeStyle(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomTabNavigator');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={themeStyle.Container}>
      <Image source={tick} style={themeStyle.socialicon} />
      <Text style={themeStyle.title}>SUCCESSFUL</Text>
      <Text style={themeStyle.subtitle}>Your password is changed.</Text>
    </SafeAreaView>
  );
};

export default Successful;
