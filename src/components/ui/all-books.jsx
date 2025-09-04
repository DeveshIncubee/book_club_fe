"use client";
import { useQuery } from "@apollo/client/react";
import { Flex, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "@/lib/queries";
import Book from "./book";

function BookSkeleton({ idx }) {
  return (
    <Stack
      gap="6"
      width={{ base: "100%", md: "25%" }}
      data-testid={`book-skeleton-${idx}`}
    >
      <SkeletonText noOfLines={3} />
      <Skeleton height="140px" />
    </Stack>
  );
}

export default function AllBooks() {
  const { data } = useQuery(ALL_BOOKS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data?.books);
    }
  }, [data]);

  return (
    <Flex
      wrap="wrap"
      justifyContent="space-between"
      alignItems="stretch"
      gap="10"
      mt="3"
    >
      {books?.length > 0 ? (
        books?.map((book, index) => (
          <Book key={`book-${index + 1}`} book={book} />
        ))
      ) : (
        <>
          <BookSkeleton idx={1} />
          <BookSkeleton idx={2} />
          <BookSkeleton idx={3} />
          <BookSkeleton idx={4} />
          <BookSkeleton idx={5} />
          <BookSkeleton idx={6} />
        </>
      )}
    </Flex>
  );
}
