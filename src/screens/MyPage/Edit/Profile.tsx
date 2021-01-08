import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useMutation} from '@apollo/client';

import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {Icon, Snackbar} from 'react-native-magnus';

import {UPDATE_PROFILE} from 'src/queries/MyPage';

import {ProfileForm} from 'src/components/form/ProfileForm';
import {SubHeader} from 'src/components/header/SubHeader';

import {UserProfile} from 'src/types/Mypage';
interface Props {}

const initialState = {
  name: '',
  username: '',
};

export const EditProfileScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {
    data,
  }: {
    data: UserProfile;
  } = params;

  const [{username, name}, setState] = useState(initialState);
  const [images, setImages] = useState('');
  const [loadingImages, setLoadingImages] = useState(false);

  const snackbarRef = useRef(null);

  const [UpdateUser, {loading: loadingUpdate}] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    let username = data.username || '';
    let name = data.name || '';
    let profile_img = data.profile_img || '';

    setImages(profile_img);
    setState({
      name,
      username,
    });
  }, [data]);

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
    setState((state: any) => ({...state, [id]: value}));
  };

  const onUpdateUser = () => {
    UpdateUser({
      variables: {
        name,
        username,
        profile_img: images,
      },
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <SubHeader title="EDIT PROFILE" />
      <ProfileForm
        name={name}
        username={username}
        images={images}
        loadingImages={loadingImages}
        loadingSubmit={loadingUpdate}
        onChangeState={onChangeState}
        onSelectPhotoTapped={selectPhotoTapped}
        onSubmit={onUpdateUser}
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
        Updated!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({});
