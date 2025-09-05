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
    books(limit: 40) {
      id
      title
      author
      genre
      publishedYear
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
      location
      host {
        id
        name
      }
      startsAt
      endsAt
      attendees {
        id
        name
      }
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

export const ATTEND_EVENT = gql`
  mutation AttendEvent($userId: ID!, $eventId: ID!) {
    attendEvent(input: { userId: $userId, eventId: $eventId }) {
      attendee {
        id
        user {
          id
          name
        }
      }
      errors
    }
  }
`;

export const UNATTEND_EVENT = gql`
  mutation UnttendEvent($userId: ID!, $eventId: ID!) {
    unattendEvent(input: { userId: $userId, eventId: $eventId }) {
      attendee {
        id
        user {
          id
        }
      }
      errors
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $genre: String!
    $publishedYear: Int!
  ) {
    createBook(
      input: {
        title: $title
        author: $author
        genre: $genre
        publishedYear: $publishedYear
      }
    ) {
      book {
        id
      }
      errors
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $location: String!
    $userId: ID!
    $startsAt: ISO8601DateTime!
    $endsAt: ISO8601DateTime!
  ) {
    createEvent(
      input: {
        title: $title
        description: $description
        location: $location
        userId: $userId
        startsAt: $startsAt
        endsAt: $endsAt
      }
    ) {
      event {
        id
      }
      errors
    }
  }
`;
