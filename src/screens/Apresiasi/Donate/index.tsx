import React from 'react';
import {useRoute} from '@react-navigation/native';
import {gql, useQuery} from '@apollo/client';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {format} from 'date-fns';

import {SubHeader} from 'src/components/header/SubHeader';

import {Donation} from 'src/types/ApresiasiCreator';

interface Props {}

const GET_TRANSACTION = gql`
  query GetCurrentUserTransactionById($id: String!) {
    getCurrentUserTransactionById(id: $id) {
      payment_tanggal
      payment_amount
      customer_name
      pesan_dukungan
    }
  }
`;

export const ApresiasiDonateScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {id} = params;

  const {
    loading: transaction_loading,
    error: transaction_error,
    data: transaction_data,
    refetch,
  } = useQuery(GET_TRANSACTION, {
    variables: {
      id,
    },
  });

  const transaction_list: Donation[] =
    transaction_data && transaction_data.getCurrentUserTransactionById;

  return (
    <Div h={hp('100%')} bg="#fff">
      <SubHeader title="DONATUR" />

      {transaction_error ? (
        <Div justifyContent="center" alignItems="center">
          <Text textAlign="center" fontWeight="bold" fontSize="lg">
            Something went wrong...
          </Text>
        </Div>
      ) : null}

      {transaction_loading ? (
        <Div h={hp('50%')} justifyContent="center">
          <ActivityIndicator color="#be1e2d" size={50} />
        </Div>
      ) : (
        transaction_list && (
          <FlatList
            data={transaction_list}
            refreshControl={
              <RefreshControl
                refreshing={transaction_loading}
                colors={['#4299e1']}
                onRefresh={refetch}
              />
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <Div
                w={wp('95%')}
                m={10}
                p={10}
                rounded={10}
                style={{
                  borderColor: '#ddd',
                  borderWidth: 1,
                }}>
                <Div row justifyContent="space-between" mb={10}>
                  <Text fontWeight="bold">Tanggal</Text>
                  <Text fontWeight="bold">
                    {format(new Date(item.payment_tanggal), 'dd-MM-yyyy')}
                  </Text>
                </Div>
                <Div row justifyContent="space-between" mb={10}>
                  <Text fontWeight="bold">Nama</Text>
                  <Text fontWeight="bold">{item.customer_name}</Text>
                </Div>
                <Div row justifyContent="space-between" mb={10}>
                  <Text fontWeight="bold">Pesan</Text>
                  <Text
                    fontWeight="bold"
                    w="50%"
                    textAlign="right"
                    numberOfLines={3}>
                    {item.pesan_dukungan}
                  </Text>
                </Div>
                <Div row justifyContent="space-between" mb={10}>
                  <Text fontWeight="bold">Dana</Text>
                  <Text fontWeight="bold">
                    Rp. {Number(item.payment_amount).toLocaleString(undefined)}
                  </Text>
                </Div>
              </Div>
            )}
          />
        )
      )}
    </Div>
  );
};

const styles = StyleSheet.create({});
