import React from 'react';
import {Picker} from '@react-native-picker/picker';

import {StyleSheet} from 'react-native';
import {Button, Div, Header, Modal, Text} from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface Props {
  visible: boolean;
  page_active: string;
  loadingSubmit: boolean;
  onChangePageActive: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const PageSettingsForm: React.FC<Props> = ({
  visible,
  page_active,
  loadingSubmit,
  onChangePageActive,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      isVisible={visible}
      rounded={20}
      m={10}
      h={heightPercentageToDP('25%')}
      justifyContent="center"
      onBackButtonPress={onClose}
      backdropOpacity={0.2}>
      <Div mx={10}>
        <Header
          p="lg"
          borderBottomWidth={1}
          borderBottomColor="gray200"
          prefix={
            <Icon
              name="chevron-left"
              size={25}
              color="#be1e2d"
              onPress={onClose}
            />
          }
          alignment="center">
          <Text color="#be1e2d" fontWeight="bold">
            Edit Page Settings
          </Text>
        </Header>
        <Div w="100%" my={5} borderWidth={1} borderColor="gray200" rounded={5}>
          <Picker
            selectedValue={page_active}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              onChangePageActive(String(itemValue))
            }>
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
          </Picker>
        </Div>

        <Button
          mt={10}
          w={'100%'}
          bg="blue600"
          disabled={!page_active || loadingSubmit}
          onPress={onSubmit}>
          Simpan
        </Button>
      </Div>
    </Modal>
  );
};

const styles = StyleSheet.create({});
