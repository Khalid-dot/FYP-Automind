import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {UserContext} from '../UserContext/UserContext';
import {Picker} from '@react-native-picker/picker'; // Import the Picker component
import styles from './style';
import {useTheme} from '../ThemeContext/ThemeContext';

const AccountSetting = ({navigation}) => {
  const {userData, setUserData} = useContext(UserContext);
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          setUserId(userId);
          

          


          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFullName(userData.name || '');
            setGender(userData.gender || '');
            setPhoneNumber(userData.phoneNumber || '');
            setNationality(userData.nationality || '');
            if (userData.profileImage) {
              setImage({uri: userData.profileImage});
            }
            setUserData(userData);
          } else {
            Alert.alert('Error', 'User data not found');
          }
        } else {
          Alert.alert('Error', 'User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
        // Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is required');
      return;
    }

    try {
      const userDocRef = firestore().collection('users').doc(userId);

      const updatedData = {
        name: fullName,
        nationality: nationality,
        gender: gender,
        phoneNumber: phoneNumber,
        profileImage: image ? image.uri : null,
      };

      await userDocRef.set(updatedData, {merge: true});
      Alert.alert('Success', 'User data updated successfully');

      setUserData(prevData => ({
        ...prevData,
        ...updatedData,
      }));
    } catch (error) {
      console.error('Error updating user: ', error);
      Alert.alert('Error', 'Failed to update user data');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(selectedImage => {
        setImage({uri: selectedImage.path});
        toggleModal();
      })
      .catch(error => {
        console.log('Error opening picker', error);
        Alert.alert('Error', 'Could not open image picker.');
      });
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(selectedImage => {
        setImage({uri: selectedImage.path});
        toggleModal();
      })
      .catch(error => {
        console.log('Error opening camera', error);
        Alert.alert('Error', 'Could not open camera.');
      });
  };

  const countries = [
    {label: 'Select Nationality', value: ''},
    {label: 'Pakistani', value: 'Pakistan'},
    {label: 'United States', value: 'United States'},
    {label: 'Canada', value: 'Canada'},
    {label: 'United Kingdom', value: 'United Kingdom'},
    {label: 'Australia', value: 'Australia'},
    {label: 'India', value: 'India'},
    {label: 'Germany', value: 'Germany'},
    {label: 'France', value: 'France'},
    {label: 'Japan', value: 'Japan'},
  ];

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.textBox}>
        <TouchableOpacity
          style={themeStyle.backButton}
          onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>
        <Text style={themeStyle.title}>Account Setting</Text>
      </View>

      <View style={themeStyle.frame}>
        <View style={themeStyle.frame1}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={themeStyle.ellipse}>
              {image ? (
                <Image source={image} style={themeStyle.imagePreview} />
              ) : (
                <Ionicons
                  name="camera"
                  size={30}
                  color="#1A237E"
                  style={styles.icon}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={themeStyle.inputWrapper}>
        <Text style={themeStyle.label}>Full Name</Text>
        <View style={themeStyle.inputContainer}>
          <Ionicons
            name="person-outline"
            size={16}
            color="grey"
            style={themeStyle.inputIcon}
          />
          <TextInput
            style={themeStyle.input}
            placeholder="Enter Full Name"
            placeholderTextColor="grey"
            onChangeText={text => setFullName(text)}
            value={fullName}
          />
        </View>

        <Text style={themeStyle.label}>Gender</Text>
        <View style={themeStyle.inputContainer}>
          <Ionicons
            name="male-female-outline"
            size={16}
            color="grey"
            style={themeStyle.inputIcon}
          />
          <Picker
            selectedValue={gender}
            onValueChange={itemValue => setGender(itemValue)}
            style={themeStyle.picker}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text style={themeStyle.label}>Phone Number</Text>
        <View style={themeStyle.inputContainer}>
          <Ionicons
            name="call-outline"
            size={16}
            color="grey"
            style={themeStyle.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            placeholderTextColor="grey"
            keyboardType="phone-pad"
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
          />
        </View>

        <Text style={themeStyle.label}>Nationality</Text>
        <View style={themeStyle.inputContainer}>
          <Ionicons
            name="flag-outline"
            size={16}
            color="grey"
            style={themeStyle.inputIcon}
          />
          <Picker
            selectedValue={nationality}
            onValueChange={itemValue => setNationality(itemValue)}
            style={themeStyle.picker}>
            {countries.map(country => (
              <Picker.Item
                key={country.value}
                label={country.label}
                value={country.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={themeStyle.updateButton} onPress={updateUser}>
        <Text style={themeStyle.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={themeStyle.modalContent}>
          <Text style={themeStyle.modalTitle}>Select Image</Text>
          <TouchableOpacity style={themeStyle.modalButton} onPress={takePhoto}>
            <Ionicons
              name="camera"
              size={24}
              color="black"
              style={themeStyle.modalIcon}
            />
            <Text style={themeStyle.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themeStyle.modalButton}
            onPress={selectFromGallery}>
            <Ionicons
              name="image"
              size={24}
              color="black"
              style={themeStyle.modalIcon}
            />
            <Text style={themeStyle.modalButtonText}>Select from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themeStyle.modalButton}
            onPress={toggleModal}>
            <Text style={themeStyle.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AccountSetting;
