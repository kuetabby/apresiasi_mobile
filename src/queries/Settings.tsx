import {gql} from '@apollo/client';

export const GET_PROFILE = gql`
  {
    getUser {
      name
      gender
      address
      phone
      profile_img
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String!
    $phone: String!
    $address: String!
    $gender: String!
    $profile_img: String!
  ) {
    updateUser(
      data: {
        name: $name
        phone: $phone
        address: $address
        profile_img: $profile_img
        gender: $gender
      }
    ) {
      name
      phone
      address
      profile_img
      gender
    }
  }
`;
