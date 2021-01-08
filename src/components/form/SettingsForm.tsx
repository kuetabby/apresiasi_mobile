import {Picker} from '@react-native-picker/picker';
import React from 'react';

import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Div, Input} from 'react-native-magnus';

interface Props {
  name: string;
  gender: string | null | undefined;
  phone: string;
  address: string;
  images: string | null | undefined;
  loadingImages: boolean;
  loadingSubmit: boolean;
  onSelectPhotoTapped: () => void;
  onChangeState: (value: string, id: string) => void;
  onSubmit: () => void;
}

export const SettingsForm: React.FC<Props> = ({
  name,
  address,
  gender,
  phone,
  images,
  loadingImages,
  loadingSubmit,
  onChangeState,
  onSelectPhotoTapped,
  onSubmit,
}) => {
  return (
    <Div m={10} justifyContent="center" alignItems="center">
      <TouchableOpacity onPress={() => onSelectPhotoTapped()}>
        <Avatar
          size={120}
          m={10}
          bg="gray400"
          color="blue500"
          rounded="circle"
          source={
            Boolean(images)
              ? {
                  uri: String(images),
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
        placeholder="Name"
        p={10}
        my={5}
        color="gray900"
        fontSize={'lg'}
        value={name}
        onChangeText={(value) => onChangeState(value, 'name')}
        autoFocus={true}
      />

      <Div w="100%" borderWidth={1} borderColor="gray200" rounded={5}>
        <Picker
          selectedValue={String(gender)}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            onChangeState(String(itemValue), 'gender')
          }>
          <Picker.Item label="Laki-laki" value="Laki-laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </Div>

      <Input
        placeholder="Phone"
        p={10}
        my={5}
        color="gray900"
        fontSize={'lg'}
        value={phone}
        keyboardType="numeric"
        onChangeText={(value) => onChangeState(value, 'phone')}
      />

      <Input
        placeholder="Address"
        p={10}
        my={5}
        color="gray900"
        fontSize={'lg'}
        value={address}
        onChangeText={(value) => onChangeState(value, 'address')}
        onEndEditing={onSubmit}
      />

      <Button
        p={10}
        my={5}
        w="100%"
        fontSize={'lg'}
        disabled={loadingSubmit}
        onPress={onSubmit}>
        Simpan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
