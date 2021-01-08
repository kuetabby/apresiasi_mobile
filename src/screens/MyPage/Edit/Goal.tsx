import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useMutation} from '@apollo/client';

import {Icon, Snackbar} from 'react-native-magnus';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {UPDATE_GOAL} from 'src/queries/MyPage';

import {GoalForm} from 'src/components/form/GoalForm';
import {SubHeader} from 'src/components/header/SubHeader';

import {UserProfile} from 'src/types/Mypage';
interface Props {}

const initialState = {
  judul: '',
  description: '',
  target_dana: '',
};

export const EditGoalScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {
    data,
  }: {
    data: UserProfile;
  } = params;

  const [{description, judul, target_dana}, setState] = useState(initialState);

  const snackbarRef = useRef(null);

  const [UpdateUser, {loading: loadingUpdate}] = useMutation(UPDATE_GOAL, {
    onCompleted: () => {
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    let judul = data.judul || '';
    let description = data.description || '';
    let target_dana = data.target_dana || '';

    setState({
      judul,
      description,
      target_dana,
    });
  }, [data]);

  const onChangeState = (value: string, id: string) => {
    setState((state) => ({...state, [id]: value}));
  };

  const onUpdateUser = () => {
    UpdateUser({
      variables: {
        description,
        judul,
        target_dana,
      },
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <SubHeader title="EDIT GOAL" />
      <GoalForm
        description={description}
        judul={judul}
        target_dana={target_dana}
        loadingSubmit={loadingUpdate}
        onChangeState={onChangeState}
        onSubmit={onUpdateUser}
      />
      <Snackbar
        suffix={
          <Icon
            name="checkcircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        }
        onDismiss={() => {}}
        ref={snackbarRef}
        bg="green700"
        color="white"
        duration={2000}>
        Updated!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({});
