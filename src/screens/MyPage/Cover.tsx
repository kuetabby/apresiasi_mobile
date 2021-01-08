import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button, Div, Text} from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {}

const image = `https://cdns.klimg.com/merdeka.com/i/w/news/2020/07/21/1200732/content_images/670x335/20200721210320-1-rose-blackpink-004-tantri-setyorini.jpg`;

export const Cover: React.FC<Props> = () => {
  const navigation = useNavigation();
  return (
    <Div h={hp('40%')} style={{backgroundColor: '#fcf8e3'}} my={10}>
      <ImageBackground
        style={{height: hp('30%'), width: wp('100%')}}
        source={{uri: image}}>
        <Div h={'100%'} justifyContent="center" alignSelf="center">
          <Button
            bg="yellow500"
            onPress={() => navigation.navigate('edit_cover')}
            prefix={
              <Icon
                name="edit"
                size={20}
                color="white"
                style={{marginHorizontal: 5}}
              />
            }>
            Edit Cover Image
          </Button>
        </Div>
      </ImageBackground>
      <Div m={10}>
        <Text color="#956f68">
          Ukuran yang disarankan{' '}
          <Text color="#956f68" fontWeight="bold">
            900x225.
          </Text>
        </Text>
        <Text color="#956f68">
          Cover image digunakan untuk thumbnail pada creator card dan cover
          page.
        </Text>
      </Div>
    </Div>
  );
};

const styles = StyleSheet.create({});
