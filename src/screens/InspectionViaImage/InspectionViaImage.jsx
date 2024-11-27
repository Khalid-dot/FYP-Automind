import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../ThemeContext/ThemeContext';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import axios from 'axios';

const InspectionViaImage = ({navigation}) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [nonTyreDetected, setNonTyreDetected] = useState(false);
  const {theme} = useTheme();
  const themeStyle = styles(theme);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const takePhoto = async index => {
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Camera access is required to take photos.',
      );
      return;
    }

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(selectedImage => {
        const updatedImages = [...images];
        updatedImages[index] = {uri: selectedImage.path};
        setImages(updatedImages);
        toggleModal();
      })
      .catch(error => {
        console.log('Error opening camera', error);
        Alert.alert('Error', 'Could not open camera.');
      });
  };

  const selectFromGallery = index => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(selectedImage => {
        const updatedImages = [...images];
        updatedImages[index] = {uri: selectedImage.path};
        setImages(updatedImages);
        toggleModal();
      })
      .catch(error => {
        console.error('Error opening picker', error);
        Alert.alert('Error', 'Could not open image picker.');
      });
  };

  const deleteImage = index => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const openModalForIndex = index => {
    setSelectedIndex(index);
    toggleModal();
  };

  const sendImageForPrediction = async () => {
    const hasImage = images.some(image => image !== null);
    if (!hasImage) {
      Alert.alert('Upload Required', 'Please add at least one picture before proceeding.');
      return;
    }
  
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        formData.append('imagefiles', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      }
    });
  
    try {
      const response = await axios.post("https://automind-djg5d0hwc9bmcdc2.centralindia-01.azurewebsites.net/predict_multiple", formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
  
      // Check for non-tyre detection in the response.
      if (response.data.details && response.data.details.some(detail => detail.error === "Not a tyre image")) {
        setNonTyreDetected(true);
        Alert.alert('Non-Tyre Image Detected', 'One or more uploaded images are not tyres.');
      } else {
        setNonTyreDetected(false); // reset the state if subsequent uploads are valid
        // Proceed to results page if a valid tyre image was processed
        if (response.data.final_label) {
          navigation.navigate('ResultsViaImage', {prediction: response.data.final_label});
        } else {
          Alert.alert('No Valid Tyre Images', 'Failed to process any valid tyre images.');
        }
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      Alert.alert('Error', 'Failed to get prediction from server.');
    }
  };
  
  
  

  return (
    <View style={themeStyle.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={themeStyle.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#091155"
          style={themeStyle.icon}
        />
        
      </TouchableOpacity>

      <Text style={themeStyle.title}>Inspection Via Images</Text>
  
      {/* Error message for non-tyre images */}
      {nonTyreDetected && (
        <View style={themeStyle.nonTyreCard}>
          {/* <Text style={themeStyle.nonTy.reText}>One or more uploaded images are not tyres. Please upload only tyre images.</Text> */}
        </View>
      )}
  
      <Text style={themeStyle.subtitle}>Tyre Images</Text>
  
      {/* Image Grid */}
      <View style={themeStyle.gridContainer}>
        {images.map((image, index) => (
          <View key={index} style={themeStyle.gridButton}>
            <TouchableOpacity onPress={() => openModalForIndex(index)}>
              {image && image.uri ? (
                <Image
                  source={{uri: image.uri}}
                  style={themeStyle.gridImage}
                />
              ) : (
                <Text style={themeStyle.buttonText}>+</Text>
              )}
            </TouchableOpacity>
  
            {image && (
              <TouchableOpacity
                style={themeStyle.deleteButton}
                onPress={() => deleteImage(index)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
  
      {/* Check Now Button */}
      <TouchableOpacity style={themeStyle.checkbutton} onPress={sendImageForPrediction}>
        <Text style={themeStyle.checkbuttonText}>Check Now</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
  
      {/* Image Selection Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={themeStyle.modalContent}>
          <Text style={themeStyle.modalTitle}>Select Option</Text>
          <TouchableOpacity
            style={themeStyle.modalButton}
            onPress={() => takePhoto(selectedIndex)}>
            <Ionicons name="camera" size={24} color="black" />
            <Text style={themeStyle.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themeStyle.modalButton}
            onPress={() => selectFromGallery(selectedIndex)}>
            <Ionicons name="image" size={24} color="black" />
            <Text style={themeStyle.modalButtonText}>Select from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[themeStyle.modalButton, themeStyle.modalCancelButton]}
            onPress={toggleModal}>
            <Text style={themeStyle.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
  
};

export default InspectionViaImage;
