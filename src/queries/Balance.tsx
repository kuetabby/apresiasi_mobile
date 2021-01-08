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
      payment_tanggal
      payment_amount
      customer_name
      pesan_dukungan
    }
  }
`;
