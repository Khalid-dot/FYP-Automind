import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useTheme} from '../ThemeContext/ThemeContext';

const History = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  return (
    <SafeAreaView style={themeStyle.container}>
      <Text style={themeStyle.title}>History</Text>
      <Text style={themeStyle.subtitle}>
        Here is the list of inspections that you've made in the past.
      </Text>

      <View style={themeStyle.card}>
        <View style={themeStyle.row}>
          <View style={themeStyle.iconContainer}>
            <Ionicons name="camera-outline" size={30} color="#091155" />
          </View>
          <View style={themeStyle.detailsContainer}>
            <Text style={themeStyle.cardTitle}>Tyre Inspection</Text>
            <Text style={themeStyle.healthText}>70% Health</Text>
          </View>
          <View style={themeStyle.dateContainer}>
            <Text style={themeStyle.dateText}>10 Sep 2024</Text>
            <Text style={themeStyle.timeText}>6h30m</Text>
          </View>
        </View>

        <View style={themeStyle.divider} />

        <View style={themeStyle.healthContainer}>
          <Ionicons name="time-outline" size={20} color="#8696BB" />
          <Text style={themeStyle.healthLabel}>Tyre Health</Text>
        </View>

        {/* Bottom Section with Condition */}
        <View style={themeStyle.conditionContainer}>
          <Text style={themeStyle.conditionText}>Good Condition</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default History;
