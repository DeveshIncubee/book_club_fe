import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query {
    users(limit: 1) {
      id
      name
    }
  }
`;
