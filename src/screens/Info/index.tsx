import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {}

const Info: React.FC<Props> = () => {
  return (
    <Div
      justifyContent="center"
      alignItems="center"
      style={{backgroundColor: '#fff', height: hp('100%')}}>
      <Text fontWeight="bold" fontSize="4xl">
        Kenapa Harus Apresiasi?
      </Text>
      <Text textAlign="center">
        Apresiasi berusaha membangun budaya apresiasi karya dengan melibatkan
        para penggemar dan kreator
      </Text>
      <Div my={10}>
        <Icon
          name="money"
          size={25}
          color="blue"
          style={{textAlign: 'center'}}
        />
        <Text textAlign="center" fontWeight="bold" fontSize="xl">
          Donasi
        </Text>
      </Div>
      <Text textAlign="center">
        Terima donasi secara langsung dari penikmat karyamu dengan metode
        pembayaran yang bersahabat.
      </Text>
    </Div>
  );
};

const styles = StyleSheet.create({});

export default Info;
