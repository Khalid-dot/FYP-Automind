import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../ThemeContext/ThemeContext';

const WeatherNotifications = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          {
            params: {
              q: 'London',
              units: 'metric',
              appid: '4b07c085d686394f81fdfe1effa1a1c5',
            },
          },
        );
        setWeatherData(response.data.list.slice(0, 7));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);
  const clearNotifications = () => {
    setWeatherData([]);
  };

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.textBox}>
        <TouchableOpacity
          style={themeStyle.backButton}
          onPress={() => navigation.navigate('HomePage')}>
          <Ionicons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>
        <Text style={themeStyle.title}>Weather Notifications</Text>
      </View>
      <TouchableOpacity
        style={themeStyle.clearButton}
        onPress={clearNotifications}>
        <Text style={themeStyle.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {/* Scrollable List of Weather Data */}
      <ScrollView style={themeStyle.notificationList}>
        {weatherData.map((item, index) => (
          <View key={index} style={themeStyle.notificationItem}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
              style={themeStyle.weatherIcon}
            />
            <View style={themeStyle.weatherDetails}>
              <Text style={themeStyle.weatherTitle}>
                {item.weather[0].description}
              </Text>
              <Text style={themeStyle.weatherTemp}>
                Temperature: {item.main.temp_min}°C to {item.main.temp_max}°C
              </Text>
              <Text style={themeStyle.weatherDate}>
                {new Date(item.dt_txt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeatherNotifications;
