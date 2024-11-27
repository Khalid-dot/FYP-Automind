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
  const [serialNumber, setSerialNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const { theme } = useTheme();
  const themeStyle = styles(theme);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const sendImageToServer = async () => {
    if (!imageUri) {
      showAlert('Please upload an image before proceeding.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('imagefile', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(
        'https://automind-djg5d0hwc9bmcdc2.centralindia-01.azurewebsites.net/extract_serial',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data && response.data.tire_details) {
        navigation.navigate('ResultsViaSerialno', {
          tireDetails: {
            ...response.data.tire_details,
            serialNumber: response.data.tire_details.serialNumber || 'Not detected',
          },
        });
      } else {
        showAlert('Could not detect the tire details from the image.');
      }
    } catch (error) {
      console.error('Error sending image:', error);
      showAlert('Failed to process the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkSerialNumber = async () => {
    const currentSerialNumber = serialNumber.trim();
  
    // Log values for debugging
    // console.log('Current Serial Number:', currentSerialNumber);
    // console.log('Image URI:', imageUri);
  
    // Check if both the serial number and image are missing
    if (currentSerialNumber === '' && !imageUri) {
      Alert.alert('Please enter a serial number or upload an image for inspection.');
      return;
    }
  
    // If only serial number is provided..
    if (currentSerialNumber) {
      try {
        setLoading(true);
        const response = await axios.post(
          'https://automind-djg5d0hwc9bmcdc2.centralindia-01.azurewebsites.net/extract_serial',
          { serialNumber: currentSerialNumber },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (response.data && response.data.tire_details) {
          navigation.navigate('ResultsViaSerialno', {
            tireDetails: {
              ...response.data.tire_details,
              serialNumber: currentSerialNumber,
            },
          });
        } else {
          showAlert('Could not process the serial number.');
        }
      } catch (error) {
        console.error('Error processing serial number:', error);
        showAlert('Failed to process the serial number. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }
  
    // If only an image is provided, send the image to the server
    sendImageToServer();
  };
  
  


  const pickImageFromCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        showAlert('Camera selection cancelled');
      } else if (response.errorCode) {
        showAlert(response.errorMessage || 'Camera error occurred');
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
        showAlert('Image uploaded successfully!');
      }
    });
  };

  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        showAlert('Gallery selection cancelled');
      } else if (response.errorCode) {
        showAlert(response.errorMessage || 'Gallery error occurred');
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
        showAlert('Image uploaded successfully!');
      }
    });
  };

  return (
    <View style={themeStyle.container}>
      {/* Back Button */}
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
      <Text style={themeStyle.title}>Inspect Via Serial No</Text>
      
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