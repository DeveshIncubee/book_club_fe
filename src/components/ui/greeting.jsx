"use client";

import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Greeting() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      {currentUser?.id ? (
        <h1 className="mb-4 text-4xl">Hello, {currentUser?.name}!</h1>
      ) : (
        <h1 className="mb-4 text-4xl">Hello!</h1>
      )}
    </>
  );
}
