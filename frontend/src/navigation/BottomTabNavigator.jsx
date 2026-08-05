import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomePage} from '../components';
import Search from '../screens/Product/Product';
import History from '../screens/History/History';
import Setting from '../screens/Settings/Setting';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    left: 7,
    right: 7,
    bottom: 10,
    width: 380,
    height: 64,
    borderRadius: 600,
    color: '#fff',
  },
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name={'home'} size={24} color={focused ? 'red' : 'grey'} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              size={24}
              color={focused ? 'red' : 'grey'}
              name={'clipboard-outline'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather
              name={'shopping-bag'}
              size={24}
              color={focused ? 'red' : 'grey'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name={'setting'} size={24} color={focused ? 'red' : 'grey'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
