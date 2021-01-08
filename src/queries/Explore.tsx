import {gql} from '@apollo/client';

export const GET_CREATOR = gql`
  {
    getAllUser {
      id
      name
      profile_img
      cover_img
      description
      category
    }
  }
`;
