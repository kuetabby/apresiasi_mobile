import React, {useState} from 'react';

import {StyleSheet, View, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header, Text} from 'react-native-magnus';
import ImagePicker from 'react-native-image-picker';

import {CoverForm} from 'src/components/form/CoverForm';

interface Props {}

export const EditCover: React.FC<Props> = () => {
  const [images, setImages] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };
        cloudinaryUpload(source);
      }
    });
  };

  const cloudinaryUpload = async (photo: {
    uri: string;
    type: string | undefined;
    name: string | undefined;
  }) => {
    setLoadingImages(true);
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'rabbit_images');
    // data.append('cloud_name', 'ogcodes');
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dwppcshmi/image/upload',
        {
          method: 'post',
          body: data,
        },
      );

      const file = await res.json();
      setImages(file.secure_url);
      setLoadingImages(false);
      console.log(file.secure_url);
    } catch (error) {
      setLoadingImages(false);
      console.log('Error occured');
    }
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <StatusBar backgroundColor="#e53e3e" />
      <Header
        p="lg"
        borderBottomWidth={1}
        borderBottomColor="gray200"
        bg="red600"
        alignment="center">
        <Text color="white" fontWeight="bold">
          EDIT COVER
        </Text>
      </Header>
      <CoverForm
        images={images}
        loadingImages={loadingImages}
        selectPhotoTapped={selectPhotoTapped}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
