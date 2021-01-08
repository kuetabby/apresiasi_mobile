import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Header, Text} from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  title: string;
}

export const SubHeader: React.FC<Props> = ({title}) => {
  const navigation = useNavigation();
  return (
    <Header
      p="lg"
      borderBottomWidth={1}
      borderBottomColor="gray200"
      prefix={
        <Icon
          name="chevron-left"
          size={25}
          color="#be1e2d"
          onPress={() => navigation.goBack()}
        />
      }
      alignment="center">
      <Text color="#be1e2d" fontWeight="bold">
        {title}
      </Text>
    </Header>
  );
};

const styles = StyleSheet.create({});
