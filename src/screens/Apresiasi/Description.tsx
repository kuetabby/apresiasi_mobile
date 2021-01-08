import React from 'react';

import {StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {Creator} from 'src/types/ApresiasiCreator';

interface Props {
  data: Creator;
}

export const Description: React.FC<Props> = ({data}) => {
  return (
    <Div
      w="100%"
      borderColor="red600"
      borderWidth={1}
      rounded={20}
      p={10}
      my={5}
      alignItems="center">
      <Text fontWeight="bold" numberOfLines={5}>
        {data.description}
      </Text>
    </Div>
  );
};

const styles = StyleSheet.create({});
