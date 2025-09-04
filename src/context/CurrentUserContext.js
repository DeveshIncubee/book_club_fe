"use client";
import { useQuery } from "@apollo/client/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { CURRENT_USER } from "@/lib/queries";

const CurrentUserConext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { data } = useQuery(CURRENT_USER);

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
