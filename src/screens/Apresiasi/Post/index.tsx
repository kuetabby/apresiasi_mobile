import React from 'react';
import {gql, useQuery} from '@apollo/client';

import {useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Div, Image, Text} from 'react-native-magnus';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {SubHeader} from 'src/components/header/SubHeader';

import {Post} from 'src/types/ApresiasiCreator';
interface Props {}

const GET_POST = gql`
  query GetPostByIdParam($id: String!) {
    getPostByIdParam(id: $id) {
      id
      title
      announcement
      post_img
    }
  }
`;

export const ApresiasiPostScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {id} = params;

  const {
    loading: post_loading,
    error: post_error,
    data: post_data,
    refetch,
  } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  const post_list: Post[] = post_data && post_data.getPostByIdParam;

  return (
    <Div h={hp('100%')} bg="#fff">
      <SubHeader title="POSTS" />

      {post_error ? (
        <Div justifyContent="center" alignItems="center">
          <Text textAlign="center" fontWeight="bold" fontSize="lg">
            Something went wrong...
          </Text>
        </Div>
      ) : null}

      {post_loading ? (
        <Div h={hp('50%')} justifyContent="center">
          <ActivityIndicator color="#be1e2d" size={50} />
        </Div>
      ) : (
        post_list && (
          <FlatList
            data={post_list}
            refreshControl={
              <RefreshControl
                refreshing={post_loading}
                colors={['#4299e1']}
                onRefresh={refetch}
              />
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <Div
                w={wp('95%')}
                h={hp('45%')}
                m={10}
                p={10}
                rounded={10}
                style={{
                  borderColor: '#ddd',
                  borderWidth: 1,
                }}>
                <Text fontWeight="bold" mb={10}>
                  {item.title}
                </Text>
                <Image
                  h={'45%'}
                  w={'100%'}
                  resizeMode="contain"
                  source={{
                    uri: item.post_img,
                  }}
                />
                <Text
                  fontWeight="bold"
                  textAlign="justify"
                  mt={5}
                  numberOfLines={6}>
                  {item.announcement}
                </Text>
              </Div>
            )}
          />
        )
      )}
    </Div>
  );
};

const styles = StyleSheet.create({});
