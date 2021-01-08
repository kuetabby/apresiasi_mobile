import React, {useEffect, useState} from 'react';
import {gql, useMutation} from '@apollo/client';

import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {Div} from 'react-native-magnus';
import {
  heightPercentageToDP as hp,
  // widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {PaymentForm} from 'src/components/form/PaymentForm';
import {SubHeader} from 'src/components/header/SubHeader';
import {useRoute} from '@react-navigation/native';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $email: String!
    $customer_name: String!
    $pesan_dukungan: String!
    $phone_number: String!
    $payment_method: String!
    $payment_amount: String!
    $recipient_id: String!
  ) {
    createTransaction(
      data: {
        email: $email
        customer_name: $customer_name
        pesan_dukungan: $pesan_dukungan
        phone_number: $phone_number
        payment_amount: $payment_amount
        payment_method: $payment_method
        recipient_id: $recipient_id
      }
    ) {
      url_pembayaran
      status
    }
  }
`;

interface Props {}

const initialState = {
  nominal: '',
  pesan: '',
  nama: '',
  phone: '',
  email: '',
  payment_method: 'BK',
};

export const ApresiasiPaymentScreen: React.FC<Props> = () => {
  const {params} = useRoute();
  const {id, name} = params;

  const [
    {nominal, pesan, nama, phone, payment_method, email},
    setState,
  ] = useState(initialState);

  const [urlTransaction, setUrlTransaction] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if ([nominal, pesan, nama, phone, payment_method, email].includes('')) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  }, [nominal, pesan, nama, phone, payment_method, email]);

  const [CreateTransaction, {loading}] = useMutation(CREATE_TRANSACTION, {
    onCompleted: (data) => {
      const url_pembayaran = data?.createTransaction?.url_pembayaran;
      // console.log(data.createTransaction.url_pembayaran, "pembayaran")
      // window.open(data.createTransaction.url_pembayaran);
      console.log(url_pembayaran);
      setUrlTransaction(url_pembayaran);
      // onWebView(url_pembayaran);
      setState({...initialState});
    },
  });

  const onChangeState = (value: string, id: string) => {
    setState((state) => ({...state, [id]: value}));
  };

  const onCreateTransaction = () => {
    CreateTransaction({
      variables: {
        email,
        customer_name: nama,
        pesan_dukungan: pesan,
        phone_number: phone,
        payment_amount: nominal,
        recipient_id: id,
        payment_method,
      },
    });
  };

  return (
    <Div h={hp('100%')} bg="#fff">
      {urlTransaction ? (
        <WebView source={{uri: urlTransaction}} />
      ) : (
        <>
          <SubHeader title={`APRESIASI ${String(name).toLocaleUpperCase()}`} />
          <PaymentForm
            nominal={nominal}
            nama={nama}
            pesan={pesan}
            phone={phone}
            payment_method={payment_method}
            email={email}
            isDisabled={isDisabled}
            isLoadingTransaction={loading}
            onChangeState={onChangeState}
            onCreateTransaction={onCreateTransaction}
          />
        </>
      )}
    </Div>
  );
};

const styles = StyleSheet.create({});
