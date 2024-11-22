// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import styles from './styles';
// import { useTheme } from '../ThemeContext/ThemeContext';

// const ResultsViaSerialno = ({ route, navigation }) => {
//   const { tireDetails = {} } = route.params || {};
//   const { theme } = useTheme();
//   const themeStyle = styles(theme);

//   // console.log("Tire Details Passed to Results Screen:", tireDetails);

//   const renderDetailRow = (iconName, label, value) => (
//     <Text style={[themeStyle.text, { marginBottom: 8 }]}>
//       <MaterialCommunityIcons name={iconName} size={16} color="#6b6b6b" /> {label}:{' '}
//       {value || 'Not detected'}
//     </Text>
//   );

//   const generateSerialNumber = () => {
//     if (tireDetails.serialNumber && tireDetails.serialNumber !== 'Not detected') {
//       return tireDetails.serialNumber;
//     }

//     const { Width, 'Aspect Ratio': aspectRatio, 'Rim Size': rimSize, 'Load Index': loadIndex, 'Speed Rating': speedRating } = tireDetails;

//     const width = Width && Width !== 'Not detected' ? Width.split(' ')[0] : null;
//     const aspect = aspectRatio && aspectRatio !== 'Not detected' ? aspectRatio.replace('%', '') : null;
//     const rim = rimSize && rimSize !== 'Not detected' ? rimSize.replace(' inches', '') : null;
//     const load = loadIndex && loadIndex !== 'Not detected' ? loadIndex.split(' ')[0] : null;
//     const speed = speedRating && speedRating !== 'Not detected' ? speedRating.split(' ')[0] : null;

//     const serialNumberParts = [];
//     if (width) serialNumberParts.push(width);
//     if (aspect) serialNumberParts.push(aspect);
//     if (rim) serialNumberParts.push(`R${rim}`);
//     if (load || speed) serialNumberParts.push(`${load || ''}${speed || ''}`.trim());

//     return serialNumberParts.length === 0 ? 'Not detected' : serialNumberParts.join(' ');
//   };

//   const serialNumber = generateSerialNumber();

//   return (
//     <ScrollView style={themeStyle.container}>
//       <TouchableOpacity
//         style={themeStyle.backButton}
//         onPress={() => navigation.navigate('HomePage')}>
//         <Ionicons name="arrow-back" size={24} color="#091155" />
//         <Text style={themeStyle.title}>Results</Text>
//       </TouchableOpacity>

//       <View style={{ padding: 16 }}>
//         <Text style={[themeStyle.text, { fontWeight: 'bold', marginBottom: 10 }]}>
//           Extracted Tire Details:
//         </Text>

//         <Text style={[themeStyle.text, { marginBottom: 8 }]}>
//           <MaterialCommunityIcons name="tire" size={16} color="#6b6b6b" /> Serial Number:{' '}
//           {serialNumber}
//         </Text>

//         {renderDetailRow('tire', 'Width', tireDetails.Width)}
//         {renderDetailRow('ruler', 'Aspect Ratio', tireDetails['Aspect Ratio'])}
//         {renderDetailRow('circle-outline', 'Rim Size', tireDetails['Rim Size'])}
//         {renderDetailRow('weight-kilogram', 'Load Index', tireDetails['Load Index'])}
//         {renderDetailRow('speedometer', 'Speed Rating', tireDetails['Speed Rating'])}
//         {renderDetailRow(
//           'alert-circle-outline',
//           'Other Markings',
//           tireDetails['Other Markings']?.join(', ') || 'None',
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ResultsViaSerialno;




import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {useTheme} from '../ThemeContext/ThemeContext';

const ResultsViaSerialno = ({route, navigation}) => {
  const {tireDetails = {}} = route.params || {};
  const {theme} = useTheme();
  const themeStyle = styles(theme);

  const renderDetailRow = (iconName, label, value) => (
    <View style={themeStyle.detailRow}>
      <View style={themeStyle.iconLabelRow}>
        <MaterialCommunityIcons
          name={iconName}
          size={16}
          color="#6b6b6b"
          style={themeStyle.icon}
        />
        <Text style={themeStyle.labelText}>{label}:</Text>
      </View>

      <View style={themeStyle.outputBox}>
        <Text style={themeStyle.outputText}>{value || 'Not detected'}</Text>
      </View>
    </View>
  );

  const generateSerialNumber = () => {
    const {
      Width,
      'Aspect Ratio': aspectRatio,
      'Rim Size': rimSize,
      'Load Index': loadIndex,
      'Speed Rating': speedRating,
    } = tireDetails;
  
    const width = Width?.split(' ')[0] || null;
    const aspect = aspectRatio?.replace('%', '') || null;
    const rim = rimSize?.replace(' inches', '') || null;
    const load = loadIndex?.split(' ')[0] || null;
    const speed = speedRating?.split(' ')[0] || null;
  
    let serialNumberParts = [];
    if (width && aspect) {
      serialNumberParts.push(`${width}/${aspect}`); // Combine width and aspect ratio with '/'
    } else if (width) {
      serialNumberParts.push(width); // Add only width if aspect ratio is missing
    }
    if (rim) {
      serialNumberParts.push(`R${rim}`); // Add the rim size with "R" prefix
    }
    if (load || speed) {
      serialNumberParts.push(`${load || ''}${speed || ''}`.trim()); // Combine load index and speed rating
    }
  
    return serialNumberParts.length === 0
      ? 'Not detected'
      : serialNumberParts.join(' ');
  };
  

  const serialNumber = generateSerialNumber();

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.backButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InspectionViaSerial')}>
          <Ionicons
            name="arrow-back"
            size={10}
            color="#091155"
            style={themeStyle.backicon}
          />
        </TouchableOpacity>

        <Text style={themeStyle.title}>Results</Text>
      </View>

      <View style={themeStyle.card}>
        <Text style={themeStyle.serialNumber}>
          <MaterialCommunityIcons name="tire" size={16} color="#6b6b6b" />
          {'  '}Serial Number: {serialNumber}
        </Text>

        {renderDetailRow('tire', 'Width', tireDetails.Width)}
        {renderDetailRow('ruler', 'Aspect Ratio', tireDetails['Aspect Ratio'])}
        {renderDetailRow('circle-outline', 'Rim Size', tireDetails['Rim Size'])}
        {renderDetailRow(
          'weight-kilogram',
          'Load Index',
          tireDetails['Load Index'],
        )}
        {renderDetailRow(
          'speedometer',
          'Speed Rating',
          tireDetails['Speed Rating'],
        )}
        {renderDetailRow(
          'alert-circle-outline',
          'Other Markings',
          tireDetails['Other Markings']?.join(', ') || 'None',
        )}
      </View>
    </View>
  );
};

export default ResultsViaSerialno;
