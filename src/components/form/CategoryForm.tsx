import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {gql, useQuery} from '@apollo/client';

import {ActivityIndicator, StyleSheet} from 'react-native';
import {Button, Div, Header, Modal, Text} from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {Category} from 'src/types/Mypage';
interface Props {
  visible: boolean;
  category: string;
  loadingSubmit: boolean;
  onChangeCategory: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const GET_CATEGORY = gql`
  {
    getAllCategory {
      id
      category
    }
  }
`;

export const CategoryForm: React.FC<Props> = ({
  visible,
  category,
  loadingSubmit,
  onChangeCategory,
  onClose,
  onSubmit,
}) => {
  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQuery(GET_CATEGORY);

  const dataAllCategory: Category[] = dataCategory?.getAllCategory;

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
            Edit Category
          </Text>
        </Header>
        <Div w="100%" my={5} borderWidth={1} borderColor="gray200" rounded={5}>
          {errorCategory && (
            <Text m={10} fontWeight="bold" fontSize="2xl">
              Something went wrong...
            </Text>
          )}
          {loadingCategory ? (
            <ActivityIndicator color="#be1e2d" size={30} />
          ) : dataAllCategory ? (
            <Picker
              selectedValue={category}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                onChangeCategory(String(itemValue))
              }>
              {dataAllCategory.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.category}
                  value={item.category}
                />
              ))}
            </Picker>
          ) : null}
        </Div>

        <Button
          mt={10}
          w={'100%'}
          bg="blue600"
          disabled={loadingSubmit}
          onPress={onSubmit}>
          Simpan
        </Button>
      </Div>
    </Modal>
  );
};

const styles = StyleSheet.create({});
