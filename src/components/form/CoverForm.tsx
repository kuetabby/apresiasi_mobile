import React from 'react';

import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Div, Image, Input} from 'react-native-magnus';

interface Props {
  images: string;
  loadingImages: boolean;
  selectPhotoTapped: () => void;
}

export const CoverForm: React.FC<Props> = ({
  images,
  loadingImages,
  selectPhotoTapped,
}) => {
  return (
    <Div mx={10}>
      {loadingImages ? (
        <Div justifyContent="center">
          <ActivityIndicator
            color="#be1e2d"
            size={25}
            style={{height: 100, width: 100}}
          />
        </Div>
      ) : !images ? null : (
        <Image
          h={150}
          w={'100%'}
          m={10}
          alignSelf="center"
          rounded={20}
          source={{
            uri: images,
          }}
        />
      )}

      <TouchableOpacity onPress={selectPhotoTapped}>
        <Input
          placeholder="Upload Images"
          editable={false}
          color="gray900"
          fontSize="lg"
          borderColor="gray600"
          rounded={10}
          my={5}
        />
      </TouchableOpacity>

      <Button my={5} w={'100%'} bg="blue600">
        Simpan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
