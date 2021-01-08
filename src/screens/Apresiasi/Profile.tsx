import React from 'react';

import {StyleSheet} from 'react-native';
import {Avatar, Div, Text} from 'react-native-magnus';

import {Creator} from 'src/types/ApresiasiCreator';

interface Props {
  data: Creator;
}

export const Profile: React.FC<Props> = ({data}) => {
  return (
    <Div
      w="100%"
      borderColor="red600"
      borderWidth={1}
      rounded={20}
      p={10}
      my={5}
      alignItems="center">
      <Avatar
        size={120}
        m={10}
        bg="gray400"
        color="blue500"
        rounded="circle"
        source={
          data.profile_img
            ? {
                uri: data.profile_img,
              }
            : 0
        }>
        Ava
      </Avatar>
      <Text fontWeight="bold" fontSize="2xl">
        {data.name}
      </Text>
    </Div>
  );
};

const styles = StyleSheet.create({});
