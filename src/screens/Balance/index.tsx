import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';

import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BasicHeader} from 'src/components/header/BasicHeader';

import {AuthContext} from 'src/context/Auth';
import {GET_PROFILE, GET_TRANSACTION} from 'src/queries/Balance';

import {Balances} from './Balances';
import {Table} from './Table';

interface Props {}

const Balance: React.FC<Props> = () => {
  const {signOut} = useContext(AuthContext);

  const {
    loading: loading_user,
    error: error_user,
    data: data_user,
    refetch: refetch_user,
  } = useQuery(GET_PROFILE);

  const {
    loading: loading_transaction,
    error: error_transaction,
    data: data_transaction,
    refetch: refetch_transaction,
  } = useQuery(GET_TRANSACTION);

  const user_data = data_user && data_user.getUser;
  const user_transaction =
    data_transaction && data_transaction.getCurrentUserTransaction;

  if (error_user?.message || error_transaction?.message === 'Invalid Token') {
    signOut();
  }

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              refetch_user();
              refetch_transaction();
            }}
            refreshing={loading_user || loading_transaction}
            colors={['#4299e1']}
          />
        }>
        <BasicHeader title="BALANCE" />
        <Balances data={user_data} loading={loading_user} error={error_user} />
        <Table
          data={user_transaction}
          loading={loading_transaction}
          error={error_transaction}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Balance;
