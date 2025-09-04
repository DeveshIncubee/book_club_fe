"use client";
import { useQuery } from "@apollo/client/react";
import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FEATURED_BOOKS } from "@/lib/queries";
import FeaturedBook from "./featured-book";

function FeaturedBookSkeleton({ idx }) {
  return (
    <Stack
      gap="6"
      width={{ base: "100%", md: "25%" }}
      data-testid={`featured-book-skeleton-${idx}`}
    >
      <SkeletonText noOfLines={3} />
      <Skeleton height="140px" />
    </Stack>
  );
}

export default function FeaturedBooks() {
  const { data } = useQuery(FEATURED_BOOKS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data?.books);
    }
  }, [data]);

  return (
    <Stack
      justifyContent="space-between"
      alignItems="stretch"
      direction={{ base: "column", md: "row" }}
      gap="10"
      mt="4"
    >
      {books?.length > 0 ? (
        books?.map((book, index) => (
          <FeaturedBook key={`featured-book-${index + 1}`} book={book} />
        ))
      ) : (
        <>
          <FeaturedBookSkeleton idx={1} />
          <FeaturedBookSkeleton idx={2} />
          <FeaturedBookSkeleton idx={3} />
          <FeaturedBookSkeleton idx={4} />
        </>
      )}
    </Stack>
  );
}
