import React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Div, Input, Text} from 'react-native-magnus';

interface Props {
  description: string;
  judul: string;
  target_dana: string;
  loadingSubmit: boolean;
  onChangeState: (value: string, id: string) => void;
  onSubmit: () => void;
}

export const GoalForm: React.FC<Props> = ({
  description,
  judul,
  target_dana,
  loadingSubmit,
  onChangeState,
  onSubmit,
}) => {
  return (
    <Div mx={10}>
      <Input
        placeholder="Judul"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        rounded={10}
        my={5}
        value={judul}
        onChangeText={(value) => onChangeState(value, 'judul')}
      />

      <Input
        placeholder="Description"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        multiline={true}
        numberOfLines={4}
        rounded={10}
        my={5}
        value={description}
        onChangeText={(value) => onChangeState(value, 'description')}
      />

      <Input
        placeholder="Target Dana"
        color="gray900"
        fontSize="lg"
        borderColor="gray600"
        rounded={10}
        my={5}
        keyboardType="numeric"
        value={target_dana}
        onChangeText={(value) => onChangeState(value, 'target_dana')}
        onEndEditing={onSubmit}
        prefix={
          <Text fontSize="lg" fontWeight="bold">
            Rp.
          </Text>
        }
      />

      <Button
        my={5}
        w={'100%'}
        bg="blue600"
        disabled={loadingSubmit}
        onPress={onSubmit}>
        Simpan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
