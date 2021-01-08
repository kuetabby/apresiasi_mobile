import React, {useEffect, useRef, useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {Icon, Snackbar, SnackbarRefType, Text} from 'react-native-magnus';

import {PostForm} from 'src/components/form/PostForm';
import {SubHeader} from 'src/components/header/SubHeader';
import {useRoute} from '@react-navigation/native';

import {GET_POST_BY_ID, UPDATE_POST_BY_ID} from 'src/queries/Post';

import {Posts} from 'src/types/Post';
interface Props {}

const initialState = {
  title: '',
  announcement: '',
};

export const EditPostScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {id} = params;

  const {loading: post_loading, error: post_error, data: post_data} = useQuery(
    GET_POST_BY_ID,
    {
      variables: {
        id,
      },
    },
  );
  const [UpdatePost, {loading: loadingUpdate}] = useMutation(
    UPDATE_POST_BY_ID,
    {
      onCompleted: (data) => {
        console.log(data);
        if (snackbarRef.current) {
          snackbarRef.current.show();
        }
      },
    },
  );

  const [{announcement, title}, setState] = useState(initialState);
  const [images, setImages] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);

  const snackbarRef = useRef<SnackbarRefType>(null);

  useEffect(() => {
    const data: Posts = post_data && post_data.getPostById;
    if (data) {
      setState({
        announcement: data.announcement,
        title: data.title,
      });
      setImages(data.post_img);
    }
  }, [post_data]);

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

  const onChangeState = (value: string, id: string) => {
    setState((state) => ({...state, [id]: value}));
  };

  const onUpdatePost = () => {
    UpdatePost({
      variables: {
        id,
        title,
        announcement,
        post_img: images,
      },
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <SubHeader title="EDIT POST" />
      {post_error && (
        <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
          Something went wrong...
        </Text>
      )}
      {post_loading ? (
        <ActivityIndicator color="#be1e2d" size={30} />
      ) : post_data ? (
        <PostForm
          title={title}
          announcement={announcement}
          images={images}
          loadingImages={loadingImages}
          loadingSubmit={loadingUpdate}
          selectPhotoTapped={selectPhotoTapped}
          onChangeState={onChangeState}
          onSubmit={onUpdatePost}
        />
      ) : null}
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
        Updated
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({});
