import {gql} from '@apollo/client';

export const GET_POST = gql`
  {
    getPost {
      id
      tanggal
      title
      announcement
      post_img
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      id
      tanggal
      title
      announcement
      post_img
    }
  }
`;

export const UPDATE_POST_BY_ID = gql`
  mutation UpdatePost(
    $title: String!
    $announcement: String!
    $post_img: String!
    $id: String!
  ) {
    updatePost(
      data: {
        title: $title
        announcement: $announcement
        id: $id
        post_img: $post_img
      }
    ) {
      id
      title
      announcement
      post_img
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $announcement: String!
    $post_img: String!
  ) {
    createPost(
      data: {title: $title, announcement: $announcement, post_img: $post_img}
    ) {
      id
      title
      announcement
      post_img
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      deleted
    }
  }
`;
