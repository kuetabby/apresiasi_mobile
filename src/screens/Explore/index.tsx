import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Div, Image, Text} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {GET_CREATOR} from 'src/queries/Explore';

import {SubHeader} from 'src/components/header/SubHeader';

interface Props {}

const Explore: React.FC<Props> = () => {
  const navigation = useNavigation();

  const {loading, error, data, refetch} = useQuery(GET_CREATOR);

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      {/* <Div justifyContent="center" alignItems="center">
        <Text color="#be1e2d" fontWeight="bold" fontSize="3xl">
          Explore
        </Text>
      </Div> */}

      <SubHeader title="EXPLORE" />

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
        data && (
          <FlatList
            data={data.getAllUser}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                colors={['#4299e1']}
                onRefresh={refetch}
              />
            }
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('apresiasi', {id: item.id})}>
                <Div
                  w={wp('45%')}
                  h={hp('30%')}
                  my={10}
                  mx={5}
                  style={{
                    borderRadius: 20,
                    borderColor: '#ddd',
                    borderWidth: 1,
                  }}>
                  <ImageBackground
                    source={{uri: item.cover_img}}
                    style={{
                      width: '100%',
                      height: '70%',
                    }}>
                    {item.category && (
                      <Text
                        p={5}
                        m={5}
                        bg="#eee"
                        style={{
                          alignSelf: 'flex-end',
                          borderRadius: 25,
                        }}>
                        {item.category}
                      </Text>
                    )}
                    <Div justifyContent="center" alignItems="center">
                      <Image
                        h={100}
                        w={100}
                        my={10}
                        rounded="circle"
                        source={{
                          uri: item.profile_img,
                        }}
                      />
                    </Div>
                  </ImageBackground>
                  <Div alignItems="center">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{item.username}</Text>
                  </Div>
                </Div>
              </TouchableOpacity>
            )}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Explore;
