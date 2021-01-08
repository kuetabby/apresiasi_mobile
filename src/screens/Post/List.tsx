import React, {useContext, useRef} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Div,
  Icon,
  Image,
  Snackbar,
  SnackbarRefType,
  Text,
} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {format} from 'date-fns';

import {AuthContext} from 'src/context/Auth';
import {DELETE_POST, GET_POST} from 'src/queries/Post';

import {Posts} from 'src/types/Post';
interface Props {}

export const PostList: React.FC<Props> = () => {
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);

  const snackbarRef = useRef<SnackbarRefType>(null);

  const {loading, error, data, refetch} = useQuery(GET_POST);

  const [DeletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{query: GET_POST}],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
    },
  });

  const post_data: Posts[] | [] = data && data.getPost;

  const onDeletePost = (id: string) => {
    DeletePost({
      variables: {
        id,
      },
    });
  };

  if (error?.message === 'Invalid Token') {
    signOut();
  }

  return (
    <>
      {error && (
        <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
          Something went wrong...
        </Text>
      )}
      {loading ? (
        <ActivityIndicator color="#be1e2d" size={30} />
      ) : data ? (
        <FlatList
          data={post_data}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              colors={['#4299e1']}
            />
          }
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Div
              w={wp('95%')}
              h={hp('55%')}
              m={10}
              p={10}
              rounded={10}
              style={{
                borderColor: '#ddd',
                borderWidth: 1,
              }}>
              <Text fontWeight="bold">{item.title}</Text>
              <Text fontWeight="bold" color="gray500" my={5}>
                {format(new Date(item.tanggal), 'dd-MM-yyyy')}
              </Text>
              <Image
                h={'45%'}
                w={'100%'}
                resizeMode="stretch"
                source={{
                  uri: item.post_img,
                }}
              />
              <Div h={'30%'}>
                <Text
                  fontWeight="bold"
                  textAlign="justify"
                  mt={5}
                  numberOfLines={6}>
                  {item.announcement}
                </Text>
              </Div>
              <Div row justifyContent="space-between" mt={10}>
                <Button
                  w={wp('40%')}
                  bg="#ffd165"
                  onPress={() =>
                    navigation.navigate('edit_post', {id: item.id})
                  }>
                  Edit
                </Button>
                <Button
                  w={wp('40%')}
                  bg="#be1e2d"
                  onPress={() => onDeletePost(item.id)}>
                  Remove
                </Button>
              </Div>
            </Div>
          )}
        />
      ) : null}
      <Snackbar
        suffix={
          <Icon
            name="closecircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        }
        onDismiss={() => {}}
        ref={snackbarRef}
        bg="red700"
        color="white"
        duration={2000}>
        Deleted!
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({});
