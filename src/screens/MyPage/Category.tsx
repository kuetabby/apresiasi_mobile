import React, {useEffect, useState} from 'react';
import {gql, useMutation} from '@apollo/client';

import {StyleSheet} from 'react-native';
import {Button, Div, Text} from 'react-native-magnus';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CategoryForm} from 'src/components/form/CategoryForm';

import {UPDATE_CATEGORY} from 'src/queries/MyPage';

import {UserProfile} from 'src/types/Mypage';
interface Props {
  data: UserProfile;
}

export const Category: React.FC<Props> = ({data}) => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('Animation');

  const [UpdateProfile, {loading: loadingUpdate}] = useMutation(
    UPDATE_CATEGORY,
    {
      onCompleted: () => {
        onChangeVisible();
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    const category = data.category || '';
    setCategory(category);
  }, [data]);

  const onChangeVisible = () => setVisible(!visible);
  const onChangeState = (value: string) => setCategory(value);

  const onUpdateUser = () => {
    UpdateProfile({
      variables: {
        category,
      },
    });
  };

  return (
    <Div>
      <Div
        p={10}
        m={10}
        w={wp('45%')}
        justifyContent="center"
        borderWidth={1}
        borderStyle="dashed"
        borderColor="yellow500"
        rounded={20}>
        {data.category && (
          <Text
            p={10}
            my={5}
            textAlign="center"
            fontWeight="bold"
            rounded={10}
            bg="gray300">
            {data.category}
          </Text>
        )}
        <Button
          p={10}
          my={5}
          w={'100%'}
          bg="yellow500"
          onPress={onChangeVisible}>
          Edit Category
        </Button>
      </Div>
      <CategoryForm
        visible={visible}
        onClose={onChangeVisible}
        category={category}
        loadingSubmit={loadingUpdate}
        onChangeCategory={onChangeState}
        onSubmit={onUpdateUser}
      />
    </Div>
  );
};

const styles = StyleSheet.create({});
