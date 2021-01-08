import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {Creator} from 'src/types/ApresiasiCreator';

interface Props {
  data: Creator;
}

export const Feeds: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();
  return (
    <Div flexDir="row" justifyContent="space-between" mx={10}>
      <Div w="40%" mx={10} justifyContent="center">
        <Text
          p={10}
          textAlign="center"
          fontWeight="bold"
          rounded={10}
          color="#fff"
          bg="blue500"
          onPress={() =>
            navigation.navigate('apresiasi_donate', {id: data.id})
          }>
          Donatur
        </Text>
      </Div>
      <Div w="40%" mx={10} justifyContent="center">
        <Text
          p={10}
          textAlign="center"
          fontWeight="bold"
          rounded={10}
          color="#fff"
          bg="green500"
          onPress={() => navigation.navigate('apresiasi_post', {id: data.id})}>
          Posts
        </Text>
      </Div>
    </Div>
  );
};

const styles = StyleSheet.create({});
