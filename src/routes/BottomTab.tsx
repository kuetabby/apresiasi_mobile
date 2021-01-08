import React from 'react';
import {StyleSheet} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from 'src/screens/Login';
import ExploreScreen from 'src/screens/Explore';
import InfoScreen from 'src/screens/Info';

const {
  Navigator: TabNavigator,
  Screen: TabScreen,
} = createMaterialBottomTabNavigator();

interface Props {}

export const BottomTabs = () => {
  return (
    <TabNavigator
      activeColor="#3eb35d"
      inactiveColor="#fff"
      barStyle={{backgroundColor: '#be1e2d'}}>
      <TabScreen
        name="login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({color}) => <Icon name="lock" color={color} size={20} />,
        }}
      />
      <TabScreen
        name="explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={20} />
          ),
        }}
      />
      <TabScreen
        name="info"
        component={InfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({color}) => <Icon name="info" color={color} size={20} />,
        }}
      />
    </TabNavigator>
  );
};

const styles = StyleSheet.create({});
