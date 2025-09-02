"use client";

import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Greeting() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      {currentUser?.id ? (
        <h1
          style={{
            marginBottom: 16,
            fontSize: 36,
          }}
        >
          Hello, {currentUser?.name}!
        </h1>
      ) : (
        <h1
          style={{
            marginBottom: 16,
            fontSize: 36,
          }}
        >
          Hello!
        </h1>
      )}
    </>
  );
}
