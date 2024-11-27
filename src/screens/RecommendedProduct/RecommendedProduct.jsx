import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../ThemeContext/ThemeContext';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

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
      console.error('Error fetching recommended products:', error);
      Alert.alert('Error', 'Failed to fetch recommended products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [prediction]);

  const renderProductItem = ({ item }) => (
    <View
      style={{
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: theme.cardBackground || '#f8f9fa',
        borderRadius: 10,
      }}>
      {item.Image ? (
        <Image
          source={{ uri: item.Image }}
          style={{ width: 150, height: 150, borderRadius: 10 }}
        />
      ) : (
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={{ fontSize: 16, color: theme.text, marginTop: 10 }}>
        {item.Name}
      </Text>
      <Text style={{ fontSize: 14, color: theme.textSecondary, marginTop: 5 }}>
        Rs.{item.Price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primary }}>
        Recommended Products
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: theme.secondaryText,
          marginVertical: 10,
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
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: theme.buttonBackground || colors.buttonBackground, // Fallback
            borderRadius: 5,
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 16,
              color: theme.buttonText || colors.buttonText, // Fallback
            }}>
            Back
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecommendedProduct;
