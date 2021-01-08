import {Picker} from '@react-native-picker/picker';
import React, {useRef} from 'react';

import {StyleSheet} from 'react-native';
import {Button, Div, Input, Text} from 'react-native-magnus';

interface Props {
  nominal: string;
  pesan: string;
  nama: string;
  phone: string;
  payment_method: string;
  email: string;
  isDisabled: boolean;
  isLoadingTransaction: boolean;
  onCreateTransaction: () => void;
  onChangeState: (value: string, id: string) => void;
}

export const PaymentForm: React.FC<Props> = ({
  nominal,
  pesan,
  nama,
  phone,
  payment_method,
  email,
  isDisabled,
  isLoadingTransaction,
  onCreateTransaction,
  onChangeState,
}) => {
  const textFocus1 = useRef(null);
  const textFocus2 = useRef(null);
  const textFocus3 = useRef(null);
  const textFocus4 = useRef(null);

  return (
    <Div mx={10}>
      <Input
        placeholder="Nama"
        color="gray900"
        fontSize="lg"
        borderColor="gray500"
        rounded={10}
        my={5}
        value={nama}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={(value) => onChangeState(value, 'nama')}
        onSubmitEditing={() => textFocus1.current.focus()}
      />
      <Input
        placeholder="No Telepon"
        color="gray900"
        fontSize="lg"
        borderColor="gray500"
        rounded={10}
        my={5}
        value={phone}
        keyboardType="numeric"
        onChangeText={(value) => onChangeState(value, 'phone')}
        ref={textFocus1}
        onSubmitEditing={() => textFocus2.current.focus()}
      />
      <Input
        placeholder="Email"
        color="gray900"
        fontSize="lg"
        borderColor="gray500"
        rounded={10}
        my={5}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => onChangeState(value, 'email')}
        ref={textFocus2}
        onSubmitEditing={() => textFocus3.current.focus()}
      />
      <Input
        placeholder="Nominal"
        color="gray900"
        fontSize="lg"
        borderColor="gray500"
        rounded={10}
        my={5}
        prefix={
          <Text fontWeight="bold" fontSize="lg">
            Rp.
          </Text>
        }
        value={nominal}
        keyboardType="numeric"
        onChangeText={(value) => onChangeState(value, 'nominal')}
        ref={textFocus3}
        onSubmitEditing={() => textFocus4.current.focus()}
      />
      <Input
        placeholder="Pesan Dukungan"
        color="gray900"
        fontSize="lg"
        borderColor="gray500"
        rounded={10}
        my={5}
        multiline={true}
        numberOfLines={4}
        value={pesan}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => onChangeState(value, 'pesan')}
        ref={textFocus4}
      />

      <Div w="100%" borderWidth={1} borderColor="gray500" rounded={10}>
        <Text ml={10} mt={10} fontWeight="bold" fontSize="lg">
          Pilih Metode Pembayaran
        </Text>
        <Picker
          selectedValue={payment_method}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
            onChangeState(String(itemValue), 'payment_method');
          }}>
          <Picker.Item label="BCA KlikPay (Biaya Rp.6000)" value="BK" />
          <Picker.Item
            label="Mandiri Virtual Account (Biaya Rp.4000)"
            value="M1"
          />
          <Picker.Item
            label="Permata Bank Virtual Account (Biaya Rp.0)"
            value="BT"
          />
          <Picker.Item label="ATM BERSAMA (Biaya Rp.0)" value="A1" />
          <Picker.Item label="BNI Virtual Account (Biaya Rp.3000)" value="I1" />
        </Picker>
      </Div>

      <Button
        p={10}
        w="100%"
        my={5}
        fontSize={'lg'}
        disabled={isDisabled || isLoadingTransaction}
        onPress={onCreateTransaction}>
        Lanjutkan
      </Button>
    </Div>
  );
};

const styles = StyleSheet.create({});
