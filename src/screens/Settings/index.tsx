import React, {useContext, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Div, Icon, Snackbar, SnackbarRef, Text} from 'react-native-magnus';
import * as ImagePicker from 'react-native-image-picker/src';

import {BasicHeader} from 'src/components/header/BasicHeader';
import {SettingsForm} from 'src/components/form/SettingsForm';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {AuthContext} from 'src/context/Auth';
import {GET_PROFILE, UPDATE_PROFILE} from 'src/queries/Settings';

import {User} from 'src/types/Settings';
interface Props {}

const initialState = {
  name: '',
  phone: '',
  address: '',
  gender: '',
};

const Settings: React.FC<Props> = () => {
  const [{name, phone, address, gender}, setState] = useState<User>(
    initialState,
  );
  const [images, setImages] = useState<string | null | undefined>('');
  const [loadingImages, setLoadingImages] = useState(false);

  const {signOut} = useContext(AuthContext);

  const snackbarRef = useRef<SnackbarRef>(null);

  const {
    loading: user_loading,
    error: user_error,
    data: user_data,
    refetch: user_refetch,
  } = useQuery(GET_PROFILE);
  const [UpdateUser, {loading: loadingUpdate}] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{query: GET_PROFILE}],
    awaitRefetchQueries: true,
    onCompleted: () => {
      user_refetch();
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
    },
  });

  useEffect(() => {
    const data: User = user_data && user_data.getUser;
    if (data) {
      setState({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        gender: data.gender || 'Laki-laki',
      });
      setImages(data.profile_img);
    }
  }, [user_data]);

  const selectPhotoTapped = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      quality: 1,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
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

  const onUpdateUser = () => {
    UpdateUser({
      variables: {
        name,
        phone,
        address,
        gender,
        profile_img: images,
      },
    });
  };

  if (user_error?.message === 'Invalid Token') {
    signOut();
  }

  return (
    <Div style={{backgroundColor: '#fff', height: hp('100%')}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={user_refetch}
            refreshing={user_loading}
            colors={['#4299e1']}
          />
        }>
        <BasicHeader title="ACCOUNT SETTINGS" />
        {user_error && (
          <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
            Something went wrong...
          </Text>
        )}
        {user_loading ? (
          <ActivityIndicator color="#be1e2d" size={30} />
        ) : user_data ? (
          <SettingsForm
            address={String(address)}
            name={name}
            gender={gender}
            phone={String(phone)}
            images={images}
            loadingImages={loadingImages}
            loadingSubmit={loadingUpdate}
            onChangeState={onChangeState}
            onSelectPhotoTapped={selectPhotoTapped}
            onSubmit={onUpdateUser}
          />
        ) : null}
      </ScrollView>
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
        duration={3000}>
        Updated!
      </Snackbar>
    </Div>
  );
};

const styles = StyleSheet.create({});

export default Settings;
