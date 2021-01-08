import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Div, Drawer, Header, Text} from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useLogout} from 'src/hooks';

interface Props {
  title: string;
}

const title_list = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'bar-chart',
    nav: 'dashboard',
  },
  {
    id: 2,
    title: 'My Page',
    icon: 'globe',
    nav: 'my_page',
  },
  {
    id: 3,
    title: 'My Balance',
    icon: 'credit-card',
    nav: 'balance',
  },
  {
    id: 4,
    title: 'Posts',
    icon: 'file-o',
    nav: 'post',
  },
  {
    id: 5,
    title: 'Account Settings',
    icon: 'user',
    nav: 'settings',
  },
];

export const BasicHeader: React.FC<Props> = ({title}) => {
  const navigation = useNavigation();
  const drawerRef = useRef<any>();

  const [outLoading, onLogout] = useLogout();

  return (
    <>
      <Drawer ref={drawerRef} bg="red600" rounded={10}>
        <Text
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
          color="white"
          my={10}>
          APRESIASI
        </Text>
        <Div>
          <FlatList
            data={title_list}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.nav);
                  drawerRef.current.close();
                }}>
                <Div row m={10}>
                  <Icon name={item.icon} size={25} color="#fff" />
                  <Text
                    fontSize="lg"
                    mx={10}
                    fontWeight="bold"
                    lineHeight={35}
                    color="white">
                    {item.title}
                  </Text>
                </Div>
              </TouchableOpacity>
            )}
          />
        </Div>
        <Div mx={10}>
          {Boolean(outLoading) ? (
            <ActivityIndicator size={30} color="#d69e2e" />
          ) : (
            <Button w={'100%'} bg="yellow600" onPress={() => onLogout()}>
              LOGOUT
            </Button>
          )}
        </Div>
      </Drawer>
      <StatusBar backgroundColor="#ddd" />
      <Header
        p="lg"
        borderBottomWidth={1}
        borderBottomColor="gray200"
        prefix={
          <Icon
            name="bars"
            size={30}
            color="#ddd"
            onPress={() => drawerRef.current.open()}
          />
        }
        suffix={
          <Button bg="green600" onPress={() => navigation.navigate('explore')}>
            Explore
          </Button>
        }
        alignment="center">
        <Text color="#be1e2d" fontWeight="bold">
          {title}
        </Text>
      </Header>
    </>
  );
};

const styles = StyleSheet.create({});
