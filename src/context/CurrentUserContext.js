"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { createContext, useEffect, useState } from "react";

const USER_QUERY = gql`
  query Query {
    users(limit: 1) {
      id
      name
    }
  }
`;

export const CurrentUserConext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { data } = useQuery(USER_QUERY);

  const [currentUser, setCurrentUser] = useState({ name: "user" });

  useEffect(() => {
    if (data) {
      const user = data?.users[0];
      setCurrentUser(user);
    }
  }, [data]);

  return (
    <CurrentUserConext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserConext.Provider>
  );
};
