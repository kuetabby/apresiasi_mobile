import React, {useRef, useState} from 'react';
import {useMutation} from '@apollo/client';

import {Alert, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'react-native-image-picker/src';
import {Icon, Snackbar, SnackbarRef} from 'react-native-magnus';

import {CREATE_POST} from 'src/queries/Post';

import {PostForm} from 'src/components/form/PostForm';
import {SubHeader} from 'src/components/header/SubHeader';

interface Props {}

const initialState = {
  title: '',
  announcement: '',
};

export const AddPostScreen: React.FC<Props> = () => {
  const [{announcement, title}, setState] = useState(initialState);
  const [images, setImages] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);

  const snackbarRef = useRef<SnackbarRef>(null);

  const [CreatePost, {loading: loadingUpdate}] = useMutation(CREATE_POST, {
    onCompleted: () => {
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
      onClearState();
    },
  });

  const selectPhotoTapped = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      quality: 1,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        Alert.alert('You cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert(`ImagePicker Error: ${response.errorMessage}`);
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
    uri: string | undefined;
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

  const onChangeState = (value: string, id: string) => {
    setState((state) => ({...state, [id]: value}));
  };

  const onClearState = () => {
    setState({...initialState});
    setImages('');
  };

  const onCreatePost = () => {
    CreatePost({
      variables: {
        title,
        announcement,
        post_img: images,
      },
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <SubHeader title="CREATE POST" />
      <PostForm
        title={title}
        announcement={announcement}
        images={images}
        loadingImages={loadingImages}
        loadingSubmit={loadingUpdate}
        selectPhotoTapped={selectPhotoTapped}
        onChangeState={onChangeState}
        onSubmit={onCreatePost}
      />
      <Snackbar
        suffix={
          <Icon
            name="checkcircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        }
        onDismiss={() => {}}
        ref={snackbarRef}
        bg="green700"
        color="white"
        duration={2000}>
        Created!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({});
