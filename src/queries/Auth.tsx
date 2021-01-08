import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation LoginUser($email: String!, $name: String!) {
    loginUser(data: {email: $email, name: $name}) {
      accessToken
    }
  }
`;
