"use client";
import { useQuery } from "@apollo/client/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { USER_QUERY } from "@/lib/queries";

const CurrentUserConext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { data } = useQuery(USER_QUERY);

  const [currentUser, setCurrentUser] = useState({ name: "user" });

  useEffect(() => {
    if (data) {
      const user = data?.users[0];
      setCurrentUser(user);
    }
  }, [data]);

  const value = useMemo(() => {
    return {
      currentUser,
    };
  }, [currentUser]);

  return (
    <CurrentUserConext.Provider value={value}>
      {children}
    </CurrentUserConext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserConext);
