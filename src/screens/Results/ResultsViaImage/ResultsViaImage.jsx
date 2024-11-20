import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../ThemeContext/ThemeContext';

const ResultsViaImage = ({route, navigation}) => {
  const {prediction} = route.params || {}; // Safely access route params

  const {theme} = useTheme();
  const themeStyle = styles(theme);

  return (
    <View style={themeStyle.container}>
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.navigate('HomePage')}>
        <Ionicons
          name="arrow-back"
          size={10}
          color="#091155"
          style={themeStyle.icon}
        />
        <Text style={themeStyle.title}>RESULTS</Text>
      </TouchableOpacity>

      <View style={themeStyle.card}>
        <View style={themeStyle.cardHeader}>
          <Text style={themeStyle.cardTitle}>Tyre Health</Text>
          <View style={themeStyle.statusContainer}>
            <Text style={themeStyle.statustext}>
              {prediction || 'No Data'} {/* Ensure prediction is a string */}
            </Text>
          </View>
        </View>
        <View style={themeStyle.cardDivider} />
        <View style={themeStyle.cardDetailRow}>
          <View style={themeStyle.picturecontainer}>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
          </View>
        </View>
      </View>

      <View style={themeStyle.card}>
        <View style={themeStyle.cardHeader}>
          <View style={themeStyle.cardContent}>
            <Text style={themeStyle.cardTitle}>Recommendation</Text>
            <Text style={themeStyle.cardSubtitle}>
            {prediction === 'CRACKED'
  ? 'Your tyre is completely hazardous. Replacement is non-negotiable—do not attempt to drive.'
  : prediction === 'POOR'
  ? 'Your tyre shows significant wear. Replacement is highly recommended soon.'
  : prediction === 'GOOD'
  ? 'Your tyre is in reliable condition. Regular checks recommended.'
  : 'Your tyre is in perfect condition. No immediate action required.'}
            </Text>
          </View>
        </View>
      </View>

      <View style={themeStyle.card}>
        <View style={themeStyle.cardHeader}>
          <Text style={themeStyle.cardTitle}>Recommended Products</Text>
        </View>
        <View style={themeStyle.cardDivider} />
        <View style={themeStyle.cardDetailRow}>
          <View style={themeStyle.picturecontainer}>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
            <View style={themeStyle.tirepicture}></View>
          </View>
        </View>
        <View style={themeStyle.button}>
          <Text style={themeStyle.Textbutton}>View Products</Text>
        </View>
      </View>
    </View>
  );
};

export default ResultsViaImage;