import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import { useTheme } from '../ThemeContext/ThemeContext';

const History = () => {
  const [inspectionResults, setInspectionResults] = useState([]);
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  // Helper function to get percentage range based on condition
  const getHealthPercentage = (condition) => {
    switch (condition) {
      case 'CRACKED':
        return '0% - 24%';
      case 'POOR':
        return '25% - 49%';
      case 'GOOD':
        return '50% - 74%';
      case 'EXCELLENT':
        return '75% - 100%';
      default:
        return 'Unknown'; // Default case if none of the above match
    }
  };

  useEffect(() => {
    const fetchInspectionResults = () => {
      const user = auth().currentUser;
      if (user) {
        // Listen for real-time updates
        const unsubscribe = firestore()
          .collection('InspectionResults')
          .doc(user.uid)
          .collection('Results')
          .onSnapshot(snapshot => {
            const results = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setInspectionResults(results); // Update the state with new results
          });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
      }
    };

    // Fetch the results with a listener
    fetchInspectionResults();
  }, []); // Empty dependency array, so it runs only once when the component mounts

  return (
    <SafeAreaView style={themeStyle.container}>
      <Text style={themeStyle.title}>History</Text>
      <Text style={themeStyle.subtitle}>
        Here is the list of inspections that you've made in the past.
      </Text>
      <ScrollView>
        {inspectionResults.map(result => (
          <View key={result.id} style={themeStyle.card}>
            <View style={themeStyle.row}>
              <View style={themeStyle.iconContainer}>
                <Ionicons name="camera-outline" size={30} color="#091155" />
              </View>
              <View style={themeStyle.detailsContainer}>
                <Text style={themeStyle.cardTitle}>Tyre Inspection</Text>
                <Text style={themeStyle.healthText}>{getHealthPercentage(result.result)} Health</Text>
              </View>
              <View style={themeStyle.dateContainer}>
                <Text style={themeStyle.dateText}>{result.date}</Text>
                <Text style={themeStyle.timeText}>{result.time}</Text>
              </View>
            </View>
            <View style={themeStyle.divider} />
            <View style={themeStyle.conditionContainer}>
              <Text style={themeStyle.conditionText}>{result.result} Condition</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
