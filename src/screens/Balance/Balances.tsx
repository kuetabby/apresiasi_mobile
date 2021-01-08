import React from 'react';
import {ApolloError} from '@apollo/client';

import {ActivityIndicator, StyleSheet} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {UserProfile} from 'src/types/Mypage';
interface Props {
  data: UserProfile;
  loading: boolean;
  error: ApolloError | undefined;
}

export const Balances: React.FC<Props> = ({data, loading, error}) => {
  const balance_user = data && data.balance;

  return (
    <Div m={10}>
      <Text fontWeight="bold" fontSize="xl">
        Available Balance
      </Text>
      {error && (
        <Text m={10} textAlign="center" fontWeight="bold" fontSize="2xl">
          Something went wrong...
        </Text>
      )}
      {loading ? (
        <ActivityIndicator color="#be1e2d" size={30} />
      ) : data ? (
        <Text>Rp. {Number(balance_user).toLocaleString(undefined) || 0}</Text>
      ) : null}
      {/* <Text mt={5} fontWeight="bold" fontSize="xl">
                  Bank Account
                </Text>
                <Text lineHeight={25} p={5} bg="#fcf8e3">
                  Your bank account hasn't setup yet
                </Text>
                <Button my={5} w={wp('30%')} bg="#38c516">
                  Edit
                </Button>
                <Button my={5} w={wp('30%')} bg="#be1e2d">
                  Withdrawal
                </Button> */}
    </Div>
  );
};

const styles = StyleSheet.create({});
