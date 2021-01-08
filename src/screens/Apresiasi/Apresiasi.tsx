import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {SubHeader} from 'src/components/header/SubHeader';

import {Judul} from './Judul';
import {Profile} from './Profile';
import {Category} from './Category';
import {Description} from './Description';
import {Feeds} from './Feeds';

interface Props {}

const GET_CREATOR = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      name
      profile_img

      judul
      balance
      target_dana

      cover_img

      category
      description

      is_page_active
    }
  }
`;

export const ApresiasiScreen: React.FC<Props> = () => {
  const {params} = useRoute();

  const {loading, error, data, refetch} = useQuery(GET_CREATOR, {
    variables: {
      id: params.id,
    },
  });

  const data_user = data && data.getUserById;

  return (
    <Div h={hp('100%')} bg="#fff">
      <SubHeader title="APRESIASI" />

      {error ? (
        <Div justifyContent="center" alignItems="center">
          <Text textAlign="center" fontWeight="bold" fontSize="lg">
            Something went wrong...
          </Text>
        </Div>
      ) : null}

      {loading ? (
        <Div h={hp('50%')} justifyContent="center">
          <ActivityIndicator color="#be1e2d" size={50} />
        </Div>
      ) : (
        data_user && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                colors={['#4299e1']}
                onRefresh={refetch}
              />
            }>
            <Div p={10}>
              <Profile data={data_user} />
              <Judul data={data_user} />
              <Description data={data_user} />
              <Category data={data_user} />
            </Div>
            <Feeds data={data_user} />
          </ScrollView>
        )
      )}
    </Div>
  );
};

const styles = StyleSheet.create({});
