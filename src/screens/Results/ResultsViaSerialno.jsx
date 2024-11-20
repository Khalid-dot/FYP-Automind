import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useTheme } from '../ThemeContext/ThemeContext';

const ResultsViaSerialno = ({ route, navigation }) => {
  // Safely access tire details or provide default empty object
  const { tireDetails = {} } = route.params || {};
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  // Helper function to render tire detail rows
  const renderDetailRow = (iconName, label, value) => (
    <Text style={[themeStyle.text, { marginBottom: 8 }]}>
      <MaterialCommunityIcons name={iconName} size={16} color="#6b6b6b" /> {label}:{' '}
      {value || 'Not detected'}
    </Text>
  );
// Helper function to dynamically generate the serial number
const generateSerialNumber = () => {
  const { Width, 'Aspect Ratio': aspectRatio, 'Rim Size': rimSize, 'Load Index': loadIndex, 'Speed Rating': speedRating } = tireDetails;

  // Extract relevant parts from details
  const width = Width && Width !== 'Not detected' ? Width.split(' ')[0] : null; // Extract "215" from "215 mm"
  const aspect = aspectRatio && aspectRatio !== 'Not detected' ? aspectRatio.replace('%', '') : null; // Extract "50" from "50%"
  const rim = rimSize && rimSize !== 'Not detected' ? rimSize.replace(' inches', '') : null; // Extract "17" from "17 inches"
  const load = loadIndex && loadIndex !== 'Not detected' ? loadIndex.split(' ')[0] : null; // Extract "91" from "91 (615 kg, ...)"
  const speed = speedRating && speedRating !== 'Not detected' ? speedRating.split(' ')[0] : null; // Extract "W" from "W (168 mph...)"

  // Combine parts if available
  let serialNumberParts = [];
  if (width) serialNumberParts.push(width);
  if (aspect) serialNumberParts.push(aspect);
  if (rim) serialNumberParts.push(`R${rim}`);
  if (load || speed) serialNumberParts.push(`${load || ''}${speed || ''}`.trim());

  // If no parts detected, return "Not detected" once
  if (serialNumberParts.length === 0) {
    return 'Not detected';
  }

  // Join parts with spaces and return
  return serialNumberParts.join(' ');
};


  // Generate serial number
  const serialNumber = generateSerialNumber();

  return (
    <ScrollView style={themeStyle.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.navigate('HomePage')}>
        <Ionicons name="arrow-back" size={24} color="#091155" />
        <Text style={themeStyle.title}>Results</Text>
      </TouchableOpacity>

      {/* Display Tire Details */}
      <View style={{ padding: 16 }}>
        <Text style={[themeStyle.text, { fontWeight: 'bold', marginBottom: 10 }]}>
          Extracted Tire Details:
        </Text>

        {/* Serial Number Row */}
        <Text style={[themeStyle.text, { marginBottom: 8 }]}>
          <MaterialCommunityIcons name="tire" size={16} color="#6b6b6b" /> Serial Number:{' '}
          {serialNumber}
        </Text>

        {/* Render other tire details */}
        {renderDetailRow('tire', 'Width', tireDetails.Width)}
        {renderDetailRow('ruler', 'Aspect Ratio', tireDetails['Aspect Ratio'])}
        {renderDetailRow('circle-outline', 'Rim Size', tireDetails['Rim Size'])}
        {renderDetailRow('weight-kilogram', 'Load Index', tireDetails['Load Index'])}
        {renderDetailRow('speedometer', 'Speed Rating', tireDetails['Speed Rating'])}
        {renderDetailRow(
          'alert-circle-outline',
          'Other Markings',
          tireDetails['Other Markings']?.join(', ') || 'None',
        )}
      </View>
    </ScrollView>
  );
};

export default ResultsViaSerialno;
