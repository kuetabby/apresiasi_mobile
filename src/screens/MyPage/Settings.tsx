import React, {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';

import {StyleSheet} from 'react-native';
import {Button, Div} from 'react-native-magnus';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {UPDATE_SETTINGS} from 'src/queries/MyPage';

import {PageSettingsForm} from 'src/components/form/PageSettingsForm';

import {UserProfile} from 'src/types/Mypage';
interface Props {
  data: UserProfile;
}

export const Settings: React.FC<Props> = ({data}) => {
  const [visible, setVisible] = useState(false);
  const [page_active, setPageActive] = useState('');

  const [UpdateUser, {loading: loadingUpdate}] = useMutation(UPDATE_SETTINGS, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: () => {
      onChangeVisible();
    },
  });

  useEffect(() => {
    const page_active = data.is_page_active || 'Active';
    setPageActive(page_active);
  }, [data]);

  const onChangeVisible = () => setVisible(!visible);
  const onChangeState = (value: string) => setPageActive(value);

  const onUpdateUser = () => {
    UpdateUser({
      variables: {
        is_page_active: page_active,
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
        borderColor="green500"
        rounded={20}>
        <Button
          p={10}
          my={5}
          w={'100%'}
          bg="green500"
          onPress={onChangeVisible}>
          Page Settings
        </Button>
      </Div>

      <PageSettingsForm
        visible={visible}
        page_active={page_active}
        loadingSubmit={loadingUpdate}
        onChangePageActive={onChangeState}
        onClose={onChangeVisible}
        onSubmit={onUpdateUser}
      />
    </Div>
  );
};

const styles = StyleSheet.create({});
