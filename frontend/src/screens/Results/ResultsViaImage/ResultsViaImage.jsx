import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../ThemeContext/ThemeContext';
import auth from '@react-native-firebase/auth';
import styles from './style';

const ResultsViaImage = ({ route, navigation }) => {
  const { prediction, images } = route.params || {}; // Get prediction and images data
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  const [products, setProducts] = useState([]); // State to store product images

  // Map prediction values to Firestore collection names
  const collectionMapping = {
    CRACKED: 'Cracked',
    POOR: 'Poor Product',
    GOOD: 'Good Product',
    EXCELLENT: 'Excellent Product',
  };

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!prediction || !collectionMapping[prediction]) {
          Alert.alert('Error', 'Invalid or missing prediction value.');
          return;
        }

        const collectionName = collectionMapping[prediction];
        const productsList = [];
        const querySnapshot = await firestore().collection(collectionName).get();

        querySnapshot.forEach((doc) => {
          productsList.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsList.slice(0, 4)); // Display up to the first 4 products
      } catch (error) {
        Alert.alert("Error", "Failed to fetch product data.");
      }
    };

    fetchProducts();
  }, [prediction]);


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
  }, [prediction]); // Run when the prediction changes


  return (
    <View style={themeStyle.container}>
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#091155"
          style={themeStyle.icon}
        />
      </TouchableOpacity>

      <Text style={themeStyle.title}>RESULTS</Text>

      {/* Tyre Health Section */}
      <View style={themeStyle.card}>
        <View style={themeStyle.cardHeader}>
          <Text style={themeStyle.cardTitle}>Tyre Health</Text>
          <View style={themeStyle.statusContainer}>
            <Text style={themeStyle.statustext}>
              {prediction || 'No Data'}
            </Text>
          </View>
        </View>
        <View style={themeStyle.cardDivider} />
        <View style={themeStyle.cardDetailRow}>
          <View style={themeStyle.picturecontainer}>
            {/* Display uploaded images in small boxes */}
            {images && images.map((image, index) => (
              image ? (
                <View key={index} style={themeStyle.tirepicture}>
                  <Image source={{ uri: image.uri }} style={themeStyle.tirepictureImage} />
                </View>
              ) : null
            ))}
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
  
      {/* Recommended Products Section */}
      <View style={themeStyle.card}>
        <View style={themeStyle.cardHeader}>
          <Text style={themeStyle.cardTitle}>Recommended Products</Text>
        </View>
        <View style={themeStyle.cardDivider} />
        <View style={themeStyle.cardDetailRow}>
          <View style={themeStyle.picturecontainer}>
            {/* Display first 4 product images */}
            {products.length > 0 ? (
              products.map((product, index) => (
                <View key={index} style={themeStyle.tirepicture}>
                  {product.Image ? (
                    <Image 
                      source={{ uri: product.Image }} // Assuming 'Image' is the field storing product images
                      style={themeStyle.tirepictureImage} 
                    />
                  ) : (
                    <Text>No Image</Text>
                  )}
                </View>
              ))
            ) : (
              <Text>No products available</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={themeStyle.button}
          onPress={() => navigation.navigate('RecommendedProduct', { prediction })}>
          <Text style={themeStyle.Textbutton}>View Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultsViaImage;