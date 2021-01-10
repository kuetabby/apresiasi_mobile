import React from 'react';

import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Div, Image, Input} from 'react-native-magnus';

interface Props {
  title: string;
  announcement: string;
  images: string;
  loadingImages: boolean;
  loadingSubmit: boolean;
  selectPhotoTapped: () => void;
  onChangeState: (value: string, id: string) => void;
  onSubmit: () => void;
}

export const PostForm: React.FC<Props> = ({
  title,
  announcement,
  images,
  loadingImages,
  loadingSubmit,
  selectPhotoTapped,
  onChangeState,
  onSubmit,
}) => {
  return (
    <Div mx={10}>
      <Input
        placeholder="Title"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        rounded={10}
        my={5}
        value={title}
        onChangeText={(value) => onChangeState(value, 'title')}
      />

      <Input
        placeholder="Announcement"
        color="gray900"
        fontSize="lg"
        multiline={true}
        numberOfLines={3}
        borderColor="gray600"
        rounded={10}
        my={5}
        value={announcement}
        onChangeText={(value) => onChangeState(value, 'announcement')}
      />

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

      {loadingImages ? (
        <Div justifyContent="center" alignItems="center" h={100}>
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

      <Button
        my={5}
        w={'100%'}
        bg="red600"
        disabled={
          loadingSubmit ||
          [Boolean(announcement), Boolean(title), Boolean(images)].includes(
            false,
          )
        }
        onPress={onSubmit}>
        Simpan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
