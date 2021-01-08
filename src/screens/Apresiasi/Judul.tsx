import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet} from 'react-native';
import {Button, Div, Text} from 'react-native-magnus';

import {Creator} from 'src/types/ApresiasiCreator';

interface Props {
  data: Creator;
}

export const Judul: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();

  const balance = Number(data.balance).toLocaleString(undefined);
  const target_dana = Number(data.target_dana).toLocaleString(undefined);

  return (
    <Div
      w="100%"
      borderColor="red600"
      borderWidth={1}
      rounded={20}
      p={10}
      my={5}
      alignItems="center">
      <Text>{data.judul}</Text>
      <Text>
        Rp. {balance} terkumpul dari Rp. {target_dana}
      </Text>
      <Button
        w="100%"
        my={10}
        bg="#be1e2d"
        disabled={data.is_page_active !== 'active'}
        onPress={() =>
          navigation.navigate('apresiasi_payment', {
            id: data.id,
            name: data.name,
          })
        }>
        Kirim Dukungan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
