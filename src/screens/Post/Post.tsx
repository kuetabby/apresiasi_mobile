import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Div} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BasicHeader} from 'src/components/header/BasicHeader';
import {PostList} from './List';

interface Props {}

export const PostScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <BasicHeader title="POST" />
      <Div m={10}>
        <Button w={'100%'} onPress={() => navigation.navigate('add_post')}>
          Tambah Post
        </Button>
      </Div>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({});
