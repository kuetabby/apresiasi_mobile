import React from 'react';

import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Div, Avatar, Input} from 'react-native-magnus';

interface Props {
  name: string;
  images: string;
  username: string;
  loadingImages: boolean;
  loadingSubmit: boolean;
  onSelectPhotoTapped: () => void;
  onChangeState: (value: string, id: string) => void;
  onSubmit: () => void;
}

export const ProfileForm: React.FC<Props> = ({
  images,
  name,
  username,
  loadingImages,
  loadingSubmit,
  onSelectPhotoTapped,
  onChangeState,
  onSubmit,
}) => {
  return (
    <Div mx={10}>
      <TouchableOpacity onPress={() => onSelectPhotoTapped()}>
        <Avatar
          size={120}
          m={10}
          bg="gray400"
          color="blue500"
          alignSelf="center"
          rounded="circle"
          source={
            images
              ? {
                  uri: images,
                }
              : 0
          }>
          {loadingImages ? (
            <ActivityIndicator color="#be1e2d" size={25} />
          ) : (
            'Ava'
          )}
        </Avatar>
      </TouchableOpacity>

      <Input
        placeholder="Nama"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        rounded={10}
        my={5}
        value={name}
        onChangeText={(value) => onChangeState(value, 'name')}
      />

      <Input
        placeholder="Username"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        rounded={10}
        my={5}
        value={username}
        onChangeText={(value) => onChangeState(value, 'username')}
        onSubmitEditing={onSubmit}
      />

      <Button
        my={5}
        w={'100%'}
        bg="blue600"
        disabled={loadingSubmit}
        onPress={onSubmit}>
        Simpan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
