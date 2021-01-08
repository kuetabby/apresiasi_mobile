import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';

import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {BasicHeader} from 'src/components/header/BasicHeader';

import {AuthContext} from 'src/context/Auth';
import {GET_PROFILE} from 'src/queries/MyPage';

import {Category} from './Category';
import {Goal} from './Goal';
import {Profile} from './Profile';
import {Settings} from './Settings';

interface Props {}

export const MyPageScreen: React.FC<Props> = () => {
  const {signOut} = useContext(AuthContext);

  const {loading, error, data, refetch} = useQuery(GET_PROFILE);

  const data_profile = data?.getUser;

  if (error?.message === 'Invalid Token') {
    signOut();
  }

  return (
    <Div h={hp('100%')} bg="#fff">
      <BasicHeader title="MY PAGE" />
      {error && (
        <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
          {error.message}
        </Text>
      )}
      {Boolean(loading) ? (
        <ActivityIndicator color="#be1e2d" size={30} />
      ) : data ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={refetch}
              refreshing={loading}
              colors={['#4299e1']}
            />
          }>
          <Div p={10} justifyContent="space-between" alignItems="center">
            <Profile data={data_profile} />
            <Goal data={data_profile} />
          </Div>
          <Div
            h={hp('20%')}
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            my={10}>
            <Settings data={data_profile} />
            <Category data={data_profile} />
          </Div>
        </ScrollView>
      ) : null}
    </Div>
  );
};

const styles = StyleSheet.create({});
