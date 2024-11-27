
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {useTheme} from '../ThemeContext/ThemeContext';

const ResultsViaSerialno = ({route, navigation}) => {
  const {tireDetails = {}} = route.params || {};
  const {theme} = useTheme();
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
  
    const width = Width?.split(' ')[0] || null;
    const aspect = aspectRatio?.replace('%', '') || null;
    const rim = rimSize?.replace(' inches', '') || null;
    const load = loadIndex?.split(' ')[0] || null;
    const speed = speedRating?.split(' ')[0] || null;
  
    let serialNumberParts = [];
    if (width && aspect) {
      serialNumberParts.push(`${width}/${aspect}`); // Combine width and aspect ratio with '/'
    } else if (width) {
      serialNumberParts.push(width); // Add only width if aspect ratio is missing
    }
    if (rim) {
      serialNumberParts.push(`R${rim}`); // Add the rim size with "R" prefix
    }
    if (load || speed) {
      serialNumberParts.push(`${load || ''}${speed || ''}`.trim()); // Combine load index and speed rating
    }
  
    return serialNumberParts.length === 0
      ? 'Not detected'
      : serialNumberParts.join(' ');
  };
  

  const serialNumber = generateSerialNumber();

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
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
        <Text style={themeStyle.serialNumber}>
          <MaterialCommunityIcons name="tire" size={16} color="#6b6b6b" />
          {'  '}Serial Number: {serialNumber}
        </Text>

        {renderDetailRow('tire', 'Width', tireDetails.Width)}
        {renderDetailRow('ruler', 'Aspect Ratio', tireDetails['Aspect Ratio'])}
        {renderDetailRow('circle-outline', 'Rim Size', tireDetails['Rim Size'])}
        {renderDetailRow(
          'weight-kilogram',
          'Load Index',
          tireDetails['Load Index'],
        )}
        {renderDetailRow(
          'speedometer',
          'Speed Rating',
          tireDetails['Speed Rating'],
        )}
        {renderDetailRow(
          'alert-circle-outline',
          'Other Markings',
          tireDetails['Other Markings']?.join(', ') || 'None',
        )}
      </View>
    </View>
  );
};

export default ResultsViaSerialno;
