// import React from 'react';
// import {
//   SafeAreaView,
//   FlatList,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Linking,
//   Text,
//   View,
// } from 'react-native';
// import themeStyle from './style'; // Ensure you have the themeStyle imported correctly

// const products = [
//   {
//     id: '1',
//     name: 'LIQUI MOLY Mos2 10w-40 API-SL - 4 Litre',
//     price: '2.5 lacs',
//     image:
//       'https://cache3.pakwheels.com/ad_pictures/2070/liqui-moly-mos2-10w-40-api-sl-4-litre-20704936.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/liqui-moly-mos2-10w-40-api-sl-4-litre-2818840',
//   },
//   {
//     id: '2',
//     name: 'Cleaner',
//     price: '120',
//     image:
//       'https://cache2.pakwheels.com/ad_pictures/1023/universal-microfiber-cleaning-cloth-for-car-cleaning-cloth-for-kitchen-and-home-multipurpose-cloths-102335879.webp',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/microfiber-towel-yellow-and-grey-30cm-x-30cm-pack-of-5-6791857',
//   },
//   {
//     id: '3',
//     name: 'Interior Protectant ',
//     price: '1299',
//     image:
//       'https://cache4.pakwheels.com/ad_pictures/7636/pakwheels-interior-protectant-dressing-with-ocean-scent-500ml-76364586.webp',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/pakwheels-interior-protectant-dressing-with-ocean-scent-500ml-7607813',
//   },
//   {
//     id: '4',
//     name: 'Transparent Tape Roll ',
//     price: '1650',
//     image:
//       'https://cache2.pakwheels.com/ad_pictures/4784/transparent-heavy-duty-double-sided-silicone-tape-roll-47845618.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/transparent-heavy-duty-double-sided-silicone-tape-roll-5318163',
//   },

//   {
//     id: '5',
//     name: 'Corolla Door Handle',
//     price: '550',
//     image:
//       'https://cache3.pakwheels.com/ad_pictures/1701/corolla-door-handle-chrome-strips-17012057.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-door-handle-chrome-strips-2014-2020-2475635',
//   },
//   {
//     id: '6',
//     name: 'Rear Seat Organizer',
//     price: '2100',
//     image:
//       'https://cache3.pakwheels.com/ad_pictures/2133/rear-seat-organizer-red-black-21338335.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/rear-seat-organizer-red-black-2877339',
//   },
//   {
//     id: '7',
//     name: 'Dashboard Shiner',
//     price: '450',
//     image:
//       'https://cache3.pakwheels.com/ad_pictures/3150/gladiator-dashboard-polish-jasmine-450ml-31504181.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/gladiator-dashboard-polish-jasmine-450ml-dashboard-shiner-3888699',
//   },
//   {
//     id: '8',
//     name: 'Tire Air Pressure',
//     price: '875 ',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/1699020659006771.jpg?v=1724203395&width=700',
//     url: 'https://sehgalmotors.pk/collections/wheel-accessories-1/products/tire-air-pressure-guage',
//   },
//   {
//     id: '9',
//     name: 'Anti Theft Wheel Tire Tyre Clamp Lock',
//     price: '6,200 ',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/1697797844006995.jpg?v=1724179419&width=700',
//     url: 'https://sehgalmotors.pk/products/anti-theft-car-wheel-tyre-lock-clamp?_pos=17&_sid=fee65d1d9&_ss=r',
//   },
//   {
//     id: '10',
//     name: 'Soundproof Pressing Wheel 2 Way Roller',
//     price: '1,000 ',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/1697809746825042.jpg?v=1724217276&width=700',
//     url: 'https://sehgalmotors.pk/products/soundproof-pressing-wheel-2-way-roller?_pos=18&_sid=a46ed90df&_ss=r',
//   },
//   {
//     id: '11',
//     name: 'Wheel Hub Screw Cover',
//     price: '900 ',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/1710313989019148.jpg?v=1724213855&width=700',
//     url: 'https://sehgalmotors.pk/products/wheel-hub-screw-cover-yellow?_pos=21&_sid=23837ef02&_ss=r',
//   },
//   {
//     id: '12',
//     name: 'Car Hub Trim Decoration Anti Collision Strip 4 Wheel Rim',
//     price: '1,250 ',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/637995517058125520.jpgnewop.jpg?v=1724181273&width=700',
//     url: 'https://sehgalmotors.pk/products/car-hub-trim-decoration-anti-collision-strip-4-wheel-rim-yellow?_pos=109&_sid=c4b87540f&_ss=r',
//   },
//   {
//     id: '13',
//     name: '326 Power Nut Extra Long Spikes Lug Nuts for Wheels',
//     price: '5,000',
//     image:
//       'https://sehgalmotors.pk/cdn/shop/files/1710314009020150.jpg?v=1724313775&width=700',
//     url: 'https://sehgalmotors.pk/products/326-power-spikes-lug-nuts-for-wheels-blue?_pos=140&_sid=915d2e070&_ss=r',
//   },
//   {
//     id: '14',
//     name: 'Liqui Moly Motor Oil Saver',
//     price: '3300 ',
//     image:
//       'https://cache1.pakwheels.com/ad_pictures/8743/liqui-moly-motor-oil-saver-oil-additives-87431236.webp',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/search/-/?q=OIL',
//   },
//   {
//     id: '15',
//     name: 'Car Wash Cleaning Microfiber Kit Grey - 9 Pcs',
//     price: '2243 ',
//     image:
//       'https://cache1.pakwheels.com/ad_pictures/3223/car-wash-cleaning-microfiber-kit-grey-9-pcs-32235097.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/search/-/buynow_1/?q=Car+Cleaning+Kit',
//   },
//   {
//     id: '16',
//     name: 'Samco Hoses For Mazda RX 7',
//     price: ' 10,000 ',
//     image:
//       'https://cache2.pakwheels.com/ad_pictures/2249/samco-hoses-for-mazda-rx-7-red-22499820.jpg',
//     url: 'https://www.pakwheels.com/accessories-spare-parts/search/-/buynow_1/?q=Car+Cleaning+Kit',
//   },
// ];

// const Product = () => {
//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={themeStyle.productContainer}
//       onPress={() => Linking.openURL(item.url)}>
//       <Image source={{uri: item.image}} style={themeStyle.productImage} />
//       <Text style={themeStyle.productName}>{item.name}</Text>
//       <Text style={themeStyle.productPrice}>Rs.{item.price}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={themeStyle.Container}>
//       <ScrollView contentContainerStyle={themeStyle.scrollContainer}>
//         <Text style={themeStyle.title}>Products</Text>
//         <Text style={themeStyle.subtitle}>Here is a list of some products.</Text>
//         <View style={{paddingBottom: 20}}>
//           <FlatList
//             data={products}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             numColumns={2}
//             contentContainerStyle={themeStyle.list}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Product;

//

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
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
import {useTheme} from '../ThemeContext/ThemeContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

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
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  // Handle product selection
  const handleProductSelect = product => {
    setSelectedProduct(product);
  };

  // Update selected product in Firestore
  const updateProduct = async () => {
    if (!selectedProduct || !selectedProduct.id) {
      Alert.alert('Error', 'No product selected');
      return;
    }

    try {
      const productDocRef = firestore()
        .collection('Products')
        .doc(selectedProduct.id);
      await productDocRef.set(selectedProduct, {merge: true});
      Alert.alert('Success', 'Product updated successfully');
      fetchProducts(); // Refresh the product list after update
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
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
      <ScrollView contentContainerStyle={themeStyle.scrollContainer}>
        <Text style={themeStyle.title}>Products</Text>
        <Text style={themeStyle.subtitle}>
          Here is a list of some products.
        </Text>
        <View style={{paddingBottom: 20}}>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={themeStyle.list}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
