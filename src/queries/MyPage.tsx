import {gql} from '@apollo/client';

export const GET_PROFILE = gql`
  {
    getUser {
      username
      name
      profile_img

      judul
      description
      target_dana

      cover_img

      is_page_active

      balance

      category
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String!
    $username: String!
    $profile_img: String!
  ) {
    updateUser(
      data: {name: $name, username: $username, profile_img: $profile_img}
    ) {
      name
      username
      profile_img
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateProfile($is_page_active: String!) {
    updateUser(data: {is_page_active: $is_page_active}) {
      is_page_active
    }
  }
`;

export const UPDATE_GOAL = gql`
  mutation UpdateProfile(
    $judul: String!
    $description: String!
    $target_dana: String!
  ) {
    updateUser(
      data: {
        judul: $judul
        description: $description
        target_dana: $target_dana
      }
    ) {
      description
      judul
      target_dana
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateProfile($category: String!) {
    updateUser(data: {category: $category}) {
      category
    }
  }
`;
