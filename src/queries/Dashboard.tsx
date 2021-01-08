import {gql} from '@apollo/client';

export const GET_PROFILE = gql`
  {
    getUser {
      balance
    }
  }
`;

export const GET_TRANSACTION = gql`
  {
    getCurrentUserTransaction {
      id
      payment_tanggal
      payment_amount
    }
  }
`;
