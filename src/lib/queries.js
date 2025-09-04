import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    users(limit: 1) {
      id
      name
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: ID!) {
    book(id: $bookId) {
      id
      title
      author
      genre
      publishedYear
      reviews {
        id
        rating
        comment
        user {
          id
          name
        }
      }
    }
  }
`;

export const FEATURED_BOOKS = gql`
  query {
    books(limit: 4) {
      id
      title
      author
      genre
      publishedYear
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    books(limit: 10) {
      id
      title
      author
      genre
      publishedYear
    }
  }
`;

export const FEATURED_EVENTS = gql`
  query {
    events(limit: 4) {
      id
      title
      description
      location
      startsAt
      endsAt
      host {
        id
        name
        email
      }
      attendees {
        id
        name
        email
      }
    }
  }
`;

export const ALL_EVENTS = gql`
  query {
    events(limit: 10) {
      id
      title
      description
      location
      startsAt
      endsAt
      host {
        id
        name
        email
      }
      attendees {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $rating: Int!
    $comment: String!
    $userId: ID!
    $bookId: ID!
  ) {
    createReview(
      input: {
        rating: $rating
        comment: $comment
        userId: $userId
        bookId: $bookId
      }
    ) {
      review {
        id
        rating
        comment
        user {
          id
          name
        }
      }
    }
  }
`;
