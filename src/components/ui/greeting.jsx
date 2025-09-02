"use client";

import { SkeletonText } from "@chakra-ui/react";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Greeting() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      {currentUser?.id ? (
        <h1
          style={{
            marginBottom: 18,
            fontSize: 36,
          }}
        >
          Hello, {currentUser?.name}!
        </h1>
      ) : (
        <SkeletonText mb="4" noOfLines={1} width="18rem" height={14} />
      )}
    </>
  );
}
