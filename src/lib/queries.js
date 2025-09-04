import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    users(limit: 1) {
      id
      name
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
