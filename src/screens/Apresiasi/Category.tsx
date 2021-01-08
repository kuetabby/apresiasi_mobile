import React from 'react';

import {StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {Creator} from 'src/types/ApresiasiCreator';

interface Props {
  data: Creator;
}

export const Category: React.FC<Props> = ({data}) => {
  return (
    <Div mx={10} my={5} justifyContent="center">
      <Text
        p={10}
        textAlign="center"
        fontWeight="bold"
        rounded={10}
        bg="gray300">
        {data.category}
      </Text>
    </Div>
  );
};

const styles = StyleSheet.create({});
