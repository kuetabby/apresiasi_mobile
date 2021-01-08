import {ProgressBar} from '@react-native-community/progress-bar-android';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet} from 'react-native';
import {Button, Div, Text} from 'react-native-magnus';

import {UserProfile} from 'src/types/Mypage';
interface Props {
  data: UserProfile;
}

export const Goal: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();

  let percentage_dana = Math.floor(
    (Number(data.balance) / Number(data.target_dana)) * 100,
  );

  let percentage_bar = Number(data.balance) / Number(data.target_dana);

  return (
    <Div
      w="100%"
      borderColor="yellow500"
      borderWidth={1}
      rounded={20}
      p={10}
      my={5}
      alignItems="center">
      <Text>{data.judul}</Text>
      <Text>
        Rp. {Number(data.balance).toLocaleString(undefined) || 0} terkumpul dari
        Rp. {Number(data.target_dana).toLocaleString(undefined) || 0}
      </Text>
      <ProgressBar
        progress={data.target_dana ? percentage_bar : 0}
        indeterminate={false}
        style={{width: '100%'}}
        styleAttr="Horizontal"
        color="#ecc94b"
      />
      <Text>{data.target_dana ? percentage_dana : '0'}% tercapai</Text>
      <Button
        w="100%"
        my={10}
        bg="yellow500"
        onPress={() => navigation.navigate('edit_goal', {data})}>
        Edit Goal
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
