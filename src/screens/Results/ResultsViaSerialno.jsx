import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useTheme } from '../ThemeContext/ThemeContext';

const ResultsViaSerialno = ({ route, navigation }) => {
  const { tireDetails = {} } = route.params || {};
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  const renderDetailRow = (iconName, label, value) => (
    <View style={themeStyle.detailRow}>
      <View style={themeStyle.iconLabelRow}>
        <MaterialCommunityIcons
          name={iconName}
          size={16}
          color="#6b6b6b"
          style={themeStyle.icon}
        />
        <Text style={themeStyle.labelText}>{label}:</Text>
      </View>

      <View style={themeStyle.outputBox}>
        <Text style={themeStyle.outputText}>{value || 'Not detected'}</Text>
      </View>
    </View>
  );


  const generateSerialNumber = () => {
    const {
      Width,
      'Aspect Ratio': aspectRatio,
      'Rim Size': rimSize,
      'Load Index': loadIndex,
      'Speed Rating': speedRating,
    } = tireDetails;
  
    // Parse values and clean up data (remove extra text like ' inches' or '%')
    const width = Width?.split(' ')[0] || null;
    const aspect = aspectRatio?.replace('%', '') || null;
    const rim = rimSize?.replace(' inches', '') || null;
    const load = loadIndex?.split(' ')[0] || null;
    const speed = speedRating?.split(' ')[0] || null;
  
    let serialNumberParts = [];
  
    if (Width && Width !== "Not detected") {
      if (aspect && aspect !== "Not detected") {
        // Combine width, aspect ratio, and rim size (if rim is valid) in the same statement
        serialNumberParts.push(`${width}/${aspect}${rim && rim !== "Not detected" ? ` R${rim}` : ""}`);
      } else {
        serialNumberParts.push(`${width}${rim && rim !== "Not detected" ? ` R${rim}` : ""}`); // Only width if aspect is missing
      }
    }
  
    // Handle Load and Speed (if valid)
    if (loadIndex && loadIndex !== "Not detected") {
      if (speedRating && speedRating !== "Not detected") {
        serialNumberParts.push(`${load}${speed}`); // Combine load and speed if both are valid
      } else {
        serialNumberParts.push(`${load}`); // Only add Load if Speed is "Not detected"
      }
    }
  
    // Return the serial number string; if no parts are found, return an empty string
    return serialNumberParts.length === 0 ? '' : serialNumberParts.join(' ');
  };
  

  const serialNumber = generateSerialNumber();

  const otherMarkings = tireDetails['Other Markings'] || [];
  const hasTubeless = otherMarkings.some(marking => marking.toUpperCase().includes("TUBELESS"));


  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#091155"
            style={themeStyle.backicon}
          />
        </TouchableOpacity>

        <Text style={themeStyle.title}>Results</Text>
      </View>

      <View style={themeStyle.card}>
        {/* Serial Number */}
        <Text style={themeStyle.serialNumber}>
          <MaterialCommunityIcons name="tire" size={16} color="#6b6b6b" />
          <Text style={themeStyle.SerialTitle}> {'  '}Serial Number:</Text> {serialNumber || 'Not detected'}
        </Text>

        {/* Render the individual detail rows (Width, Aspect Ratio, etc.) */}
        {renderDetailRow('tire', 'Width', tireDetails.Width)}
        {renderDetailRow('ruler', 'Aspect Ratio', tireDetails['Aspect Ratio'])}
        {renderDetailRow('circle-outline', 'Rim Size', tireDetails['Rim Size'])}
        {renderDetailRow('weight-kilogram', 'Load Index', tireDetails['Load Index'])}
        {renderDetailRow('speedometer', 'Speed Rating', tireDetails['Speed Rating'])}
        {hasTubeless && renderDetailRow('alert-circle-outline', 'Other Markings', 'TUBELESS')}
      </View>
    </View>
  );
};

export default ResultsViaSerialno;
