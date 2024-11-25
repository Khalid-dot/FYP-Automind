import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native'; // Add Alert here
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'; // Ensure you've installed moment

import styles from './style';
import { useTheme } from '../../ThemeContext/ThemeContext';

const ResultsViaImage = ({ route, navigation }) => {
  const { prediction } = route.params || {};
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  const saveInspectionResult = async () => {
    const user = auth().currentUser;
    if (user) {
      const currentDate = new Date();
      const timestamp = firestore.Timestamp.fromDate(currentDate);
      const date = currentDate.toISOString().split('T')[0];
      const time = currentDate.toTimeString().split(' ')[0];

      try {
        // Use `.collection('Results').add(...)` to create a new document for each result
        await firestore()
          .collection('InspectionResults')
          .doc(user.uid)
          .collection('Results') // Sub-collection for storing individual results
          .add({
            result: prediction,
            timestamp: timestamp,
            date: date,
            time: time
          });

        Alert.alert('Success', 'Inspection results saved successfully!');
      } catch (error) {
        console.error('Error saving inspection result:', error);
        Alert.alert('Error', 'Failed to save inspection results');
      }
    } else {
      Alert.alert('Error', 'User not authenticated');
    }
  };

  useEffect(() => {
    if (prediction) {
      saveInspectionResult();
    }
  }, [prediction]);

  return (
    <View style={themeStyle.container}>
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.navigate('HomePage')}>
        <Ionicons
          name="arrow-back"
          size={24}
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
            {/* Dynamic image containers could be rendered based on prediction results or any other relevant data */}
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
