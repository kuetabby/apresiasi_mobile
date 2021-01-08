import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet} from 'react-native';
import {Avatar, Button, Div, Text} from 'react-native-magnus';

import {UserProfile} from 'src/types/Mypage';

interface Props {
  data: UserProfile;
}

export const Profile: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();

  return (
    <Div
      w="100%"
      borderColor="yellow500"
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
      <Text>{data.username}</Text>
      <Button
        w="100%"
        my={10}
        bg="yellow500"
        onPress={() => navigation.navigate('edit_profile', {data})}>
        Edit Profile
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
