import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, FlatList, Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../ThemeContext/ThemeContext';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window'); // Get width and height of the screen

const RecommendedProduct = ({ route }) => {
  const { prediction } = route.params || {}; // Receive prediction parameter from ResultsViaImage
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map prediction values to Firestore collection names
  const collectionMapping = {
    CRACKED: 'Cracked',
    POOR: 'Poor Product',
    GOOD: 'Good Product',
    EXCELLENT: 'Excellent Product',
  };

  // Fetch products dynamically based on prediction
  const fetchProducts = async () => {
    try {
      if (!prediction || !collectionMapping[prediction]) {
        Alert.alert('Error', 'Invalid or missing prediction value.');
        return;
      }

      const collectionName = collectionMapping[prediction];
      const productList = [];
      const querySnapshot = await firestore().collection(collectionName).get();

      querySnapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productList);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch recommended products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [prediction]);

  const renderProductItem = ({ item }) => (
    <View
      style={{
        marginBottom: 15,  // Reduced margin bottom to make items smaller
        alignItems: 'center',
        padding: 8,  // Reduced padding for smaller elements
        backgroundColor: theme.cardBackground || '#f8f9fa',
        borderRadius: 8,  // Slightly smaller border radius
        width: width * 0.85, // Reduced width to 85% of the screen width
        alignSelf: 'center',
      }}>
      {item.Image ? (
        <Image
          source={{ uri: item.Image }}
          style={{
            width: width * 0.3,  // Reduced image size to 30% of screen width
            height: width * 0.3,  // Keep the same aspect ratio as width
            borderRadius: 8,
          }}
        />
      ) : (
        <View
          style={{
            width: width * 0.3,
            height: width * 0.3,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={{ fontSize: 14, color: '#000', marginTop: 8 }}>{item.Name}
      </Text>
      <Text style={{ fontSize: 12.5, color: '#1A237E', marginTop: 4 }}>
        Rs.{item.Price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: width * 0.04,  // Reduced padding to 4% of screen width
      }}>
      <Text
        style={{
          fontSize: 24,  // Reduced title font size to 20
          fontWeight: 'bold',
          color: theme.primary,
        }}>
        Recommended Products
      </Text>
      <Text
        style={{
          fontSize: 16,  // Reduced subtitle font size to 14
          color: theme.primary,
          marginVertical: height * 0.015,  // Reduced margin
        }}>
        Products based on your tyre condition:
      </Text>
      {loading ? (
        <Text style={{ textAlign: 'center', color: theme.text }}>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 15 }}  // Reduced padding bottom
        />
      )}
      <TouchableOpacity
        style={{
          marginTop: height * 0.02,  // Reduced top margin
          padding: width * 0.04,  // Reduced padding to 4% of screen width
          backgroundColor: theme.buttonBackground || colors.buttonBackground,
          borderRadius: 4,  // Slightly smaller button radius
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Text
          style={{
            fontSize: 14,  // Reduced font size for button
            color: theme.buttonText || colors.buttonText,
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecommendedProduct;
