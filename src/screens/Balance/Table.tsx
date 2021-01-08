import React from 'react';
import {ApolloError} from '@apollo/client';

import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {DataTable} from 'react-native-paper';
import {format} from 'date-fns';

import {Transaction} from 'src/types/Balance';
interface Props {
  data: Transaction[] | [];
  loading: boolean;
  error: ApolloError | undefined;
}

export const Table: React.FC<Props> = ({data, loading, error}) => {
  return (
    <Div my={10}>
      <Text textAlign="center" fontWeight="bold">
        Pencapaian Target
      </Text>
      {error && (
        <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
          Something went wrong...
        </Text>
      )}
      {loading ? (
        <ActivityIndicator color="#be1e2d" size={30} />
      ) : data ? (
        <DataTable>
          <FlatList
            data={data}
            keyExtractor={(item) => item.payment_tanggal}
            ListHeaderComponent={
              <DataTable.Header>
                <DataTable.Title>Tanggal</DataTable.Title>
                <DataTable.Title>Supporter</DataTable.Title>
                <DataTable.Title>Pesan</DataTable.Title>
                <DataTable.Title>Nominal</DataTable.Title>
              </DataTable.Header>
            }
            renderItem={({item, index}) => (
              <DataTable.Row
                style={{backgroundColor: index === 0 ? '#f7cbcf' : '#fff'}}>
                <DataTable.Cell>
                  {format(new Date(item.payment_tanggal), 'dd-MM-yyyy')}
                </DataTable.Cell>
                <DataTable.Cell>{item.customer_name}</DataTable.Cell>
                <DataTable.Cell>{item.pesan_dukungan}</DataTable.Cell>
                <DataTable.Cell>
                  {Number(item.payment_amount).toLocaleString(undefined)}
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
      ) : null}
    </Div>
  );
};

const styles = StyleSheet.create({});
