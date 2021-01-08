import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from 'src/context/Auth';

import {BottomTabs} from './BottomTab';
import {
  ApresiasiScreen,
  ApresiasiDonateScreen,
  ApresiasiPaymentScreen,
  ApresiasiPostScreen,
} from 'src/screens/Apresiasi';
import {
  MyPageScreen,
  EditProfileScreen,
  EditGoalScreen,
} from 'src/screens/MyPage';
import {PostScreen, AddPostScreen, EditPostScreen} from 'src/screens/Post';
import DashboardScreen from 'src/screens/Dashboard';
import SettingsScreen from 'src/screens/Settings';
import BalanceScreen from 'src/screens/Balance';

import ExploreScreen from 'src/screens/Explore';

import LoginScreen from 'src/screens/Login';

const {Navigator, Screen} = createStackNavigator();

const apresiasiScreens = {
  apresiasi: ApresiasiScreen,
  apresiasi_payment: ApresiasiPaymentScreen,
  apresiasi_post: ApresiasiPostScreen,
  apresiasi_donate: ApresiasiDonateScreen,
  explore: ExploreScreen,
  login: LoginScreen,
};

const initialScreens = {
  dashboard: DashboardScreen,
  balance: BalanceScreen,
  settings: SettingsScreen,
};

const postScreens = {
  post: PostScreen,
  add_post: AddPostScreen,
  edit_post: EditPostScreen,
};

const myPageScreens = {
  my_page: MyPageScreen,
  edit_profile: EditProfileScreen,
  edit_goal: EditGoalScreen,
  // edit_cover: EditCover,
};

interface Props {}

const Routes = () => {
  const {state} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Navigator>
        {!state.userToken ? (
          <Screen
            component={BottomTabs}
            name="unauth"
            options={{headerShown: false}}
          />
        ) : (
          <>
            {Object.entries({
              ...initialScreens,
              ...postScreens,
              ...myPageScreens,
            }).map(([name, component]) => (
              <Screen
                component={component}
                name={name}
                options={{headerShown: false}}
              />
            ))}
          </>
        )}

        {Object.entries({
          ...apresiasiScreens,
        }).map(([name, component]) => (
          <Screen
            component={component}
            name={name}
            options={{headerShown: false}}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Routes;
