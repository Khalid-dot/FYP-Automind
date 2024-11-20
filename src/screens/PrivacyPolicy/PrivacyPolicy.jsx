import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../ThemeContext/ThemeContext';
import styles from './styles';

const PrivacyPolicy = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const themeStyle = styles(theme);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  const bulletPoints = [
    'You must provide accurate and complete information when registering.',
    'You are responsible for maintaining the confidentiality of your account information.',
    'You agree to use the app only for lawful purposes and in accordance with applicable laws.',
  ];

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.textBox}>
        <TouchableOpacity
          style={themeStyle.backButton}
          onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>
        <Text style={themeStyle.title}>Privacy & Policy</Text>
      </View>

      <ScrollView
        style={themeStyle.scrollView}
        contentContainerStyle={themeStyle.contentContainer}>
        <Text style={themeStyle.Text}>Privacy & Policy for Our App</Text>
        <Text style={themeStyle.heading}>1. Acceptance of Terms</Text>
        <Text style={themeStyle.subtitle}>
          By accessing or using the Tyre Inspection App, you agree to be bound
          by these Terms and Conditions. If you do not agree, please do not use
          the app.
        </Text>

        <Text style={themeStyle.heading}>2. User Responsibilities</Text>
        {bulletPoints.map((point, index) => (
          <View key={index} style={themeStyle.bulletItem}>
            <Text style={themeStyle.bullet}>{'\u2022'}</Text>
            <Text style={themeStyle.subtitle}>{point}</Text>
          </View>
        ))}

        <Text style={themeStyle.heading}>3. Intellectual Property</Text>
        <Text style={themeStyle.subtitle}>
          All content, features, and functionality of the app are the exclusive
          property of the app owner and are protected by copyright, trademark,
          and other intellectual property laws.
        </Text>

        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
        <Text style={themeStyle.heading}>4. Disclaimers</Text>
        <Text style={themeStyle.subtitle}>
          The app is provided on an "as-is" basis without warranties of any
          kind, either express or implied. We do not warrant that the app will
          be error-free or uninterrupted.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
