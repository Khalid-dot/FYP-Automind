
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Alert,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './style';
import { useTheme } from '../ThemeContext/ThemeContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productList = [];
      const querySnapshot = await firestore().collection('Products').get();
      querySnapshot.forEach(doc => {
        productList.push({id: doc.id, ...doc.data()});
      });
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const openURL = Url => {
    if (Url) {
      Linking.openURL(Url).catch(() => {
        Alert.alert('Error', 'Failed to open the link');
      });
    } else {
      Alert.alert('Error', 'No URL found');
    }
  };

  // Render product item
  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={themeStyle.productContainer}
      onPress={() => openURL(item.Url)}>
      {item.Image ? (
        <Image source={{uri: item.Image}} style={themeStyle.productImage} />
      ) : (
        <View style={themeStyle.placeholderImage}>
          <Text style={themeStyle.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={themeStyle.productName}>{item.Name}</Text>
      <Text style={themeStyle.productPrice}>Rs.{item.Price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={themeStyle.Container}>
      <Text style={themeStyle.title}>Products</Text>
      <Text style={themeStyle.subtitle}>
        Here is a list of some products.
      </Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={themeStyle.list}
        ListHeaderComponent={<View style={{paddingBottom: 20}} />}
      />
    </SafeAreaView>
  );
};

export default Product;
