// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   Image,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import styles from './style';
// import {useTheme} from '../ThemeContext/ThemeContext';

// const InspectionViaSerial = ({navigation}) => {
//   const [serialNumber, setSerialNumber] = useState(''); // Serial number input
//   const [modalVisible, setModalVisible] = useState(false); // Modal visibility
//   const [imageUri, setImageUri] = useState(null); // Selected image URI
//   const {theme} = useTheme(); // Theme context
//   const themeStyle = styles(theme);

//   // Open camera to capture an image
//   const pickImageFromCamera = () => {
//     launchCamera({mediaType: 'photo', quality: 1}, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.error('ImagePicker Error: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage || 'Camera error occurred');
//       } else if (response.assets) {
//         const uri = response.assets[0].uri;
//         setImageUri(uri); // Set the image URI
//         setModalVisible(false); // Close modal
//       }
//     });
//   };

//   // Open gallery to select an image
//   const pickImageFromGallery = () => {
//     launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.error('ImagePicker Error: ', response.errorMessage);
//         Alert.alert('Error', response.errorMessage || 'Gallery error occurred');
//       } else if (response.assets) {
//         const uri = response.assets[0].uri;
//         setImageUri(uri); // Set the image URI
//         setModalVisible(false); // Close modal
//       }
//     });
//   };

//   // Navigate to Results page with serial number and image URI
//   const checkSerialNumber = () => {
//     if (serialNumber.trim() === '') {
//       Alert.alert('Error', 'Please add a serial number before proceeding.');
//     } else if (!imageUri) {
//       Alert.alert(
//         'Error',
//         'Please upload or capture an image before proceeding.',
//       );
//     } else {
//       navigation.navigate('ResultsViaSerialno', {serialNumber, imageUri});
//     }
//   };

//   return (
//     <View style={themeStyle.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={themeStyle.backButton}
//         onPress={() => navigation.navigate('HomePage')}>
//         <Ionicons name="arrow-back" size={24} color="#091155" />
//         <Text style={themeStyle.title}>Inspect Via Serial No</Text>
//       </TouchableOpacity>

//       {/* Serial Number Input with Camera Button */}
//       <Text style={themeStyle.Text}>Serial No</Text>
//       <View style={themeStyle.inputContainer}>
//         <Ionicons
//           name="keypad"
//           size={20}
//           color="grey"
//           style={themeStyle.icon}
//         />
//         <TextInput
//           style={themeStyle.input}
//           placeholder="Enter Serial No"
//           placeholderTextColor="grey"
//           onChangeText={text => setSerialNumber(text)}
//           value={serialNumber}
//         />
//         <TouchableOpacity
//           style={themeStyle.cameraButton}
//           onPress={() => setModalVisible(true)}>
//           <Ionicons name="camera" size={20} color="#091155" />
//         </TouchableOpacity>
//       </View>

//       {/* Display Selected Image */}
//       {imageUri && (
//         <Image source={{uri: imageUri}} style={themeStyle.cameraPreview} />
//       )}

//       {/* Check Now Button */}
//       <TouchableOpacity
//         style={themeStyle.checkbutton}
//         onPress={checkSerialNumber}>
//         <Text style={themeStyle.checkbuttonText}>Check Now</Text>
//         <Ionicons name="arrow-forward" size={20} color="white" />
//       </TouchableOpacity>

//       {/* Image Selection Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={themeStyle.modalContainer}>
//           <View style={themeStyle.modalContent}>
//             <Text style={themeStyle.modalTitle}>Select an Option</Text>

//             {/* Take Photo Button */}
//             <TouchableOpacity
//               style={themeStyle.modalButton}
//               onPress={pickImageFromCamera}>
//               <Ionicons name="camera" size={24} color="black" />
//               <Text style={themeStyle.modalButtonText}>Take Photo</Text>
//             </TouchableOpacity>

//             {/* Choose from Gallery Button */}
//             <TouchableOpacity
//               style={themeStyle.modalButton}
//               onPress={pickImageFromGallery}>
//               <Ionicons name="image" size={24} color="black" />
//               <Text style={themeStyle.modalButtonText}>
//                 Choose from Gallery
//               </Text>
//             </TouchableOpacity>

//             {/* Cancel Button */}
//             <TouchableOpacity
//               style={[themeStyle.modalButton, {backgroundColor: '#ff4040'}]}
//               onPress={() => setModalVisible(false)}>
//               <Text style={[themeStyle.modalButtonText, {color: 'white'}]}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default InspectionViaSerial;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from './style';
import { useTheme } from '../ThemeContext/ThemeContext';

const InspectionViaSerial = ({ navigation }) => {
  const [serialNumber, setSerialNumber] = useState(''); // Serial number input
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [imageUri, setImageUri] = useState(null); // Selected image URI
  const [loading, setLoading] = useState(false); // Loading state for API
  const [apiExtractedTireDetails, setApiExtractedTireDetails] = useState({}); // Store API tire details
  const { theme } = useTheme(); // Theme context
  const themeStyle = styles(theme);

  // Function to send the image to the server for serial number extraction
  const sendImageToServer = async (uri) => {
    try {
      setLoading(true); // Start loading indicator

      // Create form data
      const formData = new FormData();
      formData.append('imagefile', {
        uri,
        type: 'image/jpeg', // Assuming JPEG format
        name: 'image.jpg',
      });

      console.log('Sending image to server:', uri);

      // Send the image to the backend API
      const response = await axios.post(
        'http://192.168.0.103:3000/extract_serial',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('API Response:', response.data);

      if (response.data && response.data.tire_details) {
        const tireDetails = response.data.tire_details;

        // Update the tire details
        setApiExtractedTireDetails(tireDetails); // Save tire details in state
        setSerialNumber(tireDetails.SerialNumber || 'Not detected');

        Alert.alert('Success', 'Tire details detected and updated.');
      } else {
        Alert.alert('Error', 'Could not detect the tire details.');
      }
    } catch (error) {
      console.error('Error sending image:', error);
      Alert.alert('Error', 'Failed to process the image. Please try again.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Open camera to capture an image
  const pickImageFromCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Camera error occurred');
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        console.log('Captured image URI:', uri);
        setImageUri(uri); // Set the image URI
        setModalVisible(false); // Close modal
        sendImageToServer(uri); // Send image to the server
      }
    });
  };

  // Open gallery to select an image
  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Gallery error occurred');
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        console.log('Selected image URI from gallery:', uri);
        setImageUri(uri); // Set the image URI
        setModalVisible(false); // Close modal
        sendImageToServer(uri); // Send image to the server
      }
    });
  };

  // Navigate to Results page with tire details
  const checkSerialNumber = () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please upload or capture an image before proceeding.');
      return;
    }

    if (!serialNumber.trim()) {
      Alert.alert('Error', 'Serial number not detected. Please reattempt extraction.');
      return;
    }

    // Combine serial number and API details
    const tireDetails = {
      serialNumber,
      ...apiExtractedTireDetails, // Include the extracted details from the API
    };

    console.log('Navigating to ResultsViaSerialno with:', tireDetails);

    navigation.navigate('ResultsViaSerialno', { tireDetails });
  };

  return (
    <View style={themeStyle.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.navigate('HomePage')}
      >
        <Ionicons name="arrow-back" size={24} color="#091155" />
        <Text style={themeStyle.title}>Inspect Via Serial No</Text>
      </TouchableOpacity>

      {/* Serial Number Input with Camera Button */}
      <Text style={themeStyle.Text}>Serial No</Text>
      <View style={themeStyle.inputContainer}>
        <Ionicons
          name="keypad"
          size={20}
          color="grey"
          style={themeStyle.icon}
        />
        <TextInput
          style={themeStyle.input}
          placeholder="Enter Serial No"
          placeholderTextColor="grey"
          onChangeText={(text) => setSerialNumber(text)}
          value={serialNumber}
        />
        <TouchableOpacity
          style={themeStyle.cameraButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="camera" size={20} color="#091155" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Display Selected Image */}
      {imageUri && (
        <View style={themeStyle.imageContainer}>
          <Image source={{ uri: imageUri }} style={themeStyle.cameraPreview} />
          <Text style={themeStyle.uploadSuccessText}>
            Image uploaded successfully!
          </Text>
        </View>
      )}

      {/* Check Now Button */}
      <TouchableOpacity
        style={themeStyle.checkbutton}
        onPress={checkSerialNumber}
      >
        <Text style={themeStyle.checkbuttonText}>Check Now</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>

      {/* Image Selection Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={themeStyle.modalContainer}>
          <View style={themeStyle.modalContent}>
            <Text style={themeStyle.modalTitle}>Select an Option</Text>

            {/* Take Photo Button */}
            <TouchableOpacity
              style={themeStyle.modalButton}
              onPress={pickImageFromCamera}
            >
              <Ionicons name="camera" size={24} color="black" />
              <Text style={themeStyle.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>

            {/* Choose from Gallery Button */}
            <TouchableOpacity
              style={themeStyle.modalButton}
              onPress={pickImageFromGallery}
            >
              <Ionicons name="image" size={24} color="black" />
              <Text style={themeStyle.modalButtonText}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={[themeStyle.modalButton, { backgroundColor: '#ff4040' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[themeStyle.modalButtonText, { color: 'white' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InspectionViaSerial;
