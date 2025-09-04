import { Box, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import BookReviews from "@/components/ui/book-reviews";
import MyReview from "@/components/ui/my-review";
import { query } from "@/lib/client";
import { GET_BOOK_BY_ID } from "@/lib/queries";

export default async function BookDetailPage({ params }) {
  const { id } = await params;

  const { data, error } = await query({
    query: GET_BOOK_BY_ID,
    variables: { bookId: id },
  });

  if (error) {
    notFound();
  }

  const { book } = await data;

  const { title, author, genre, publishedYear, reviews } = await book;

  return (
    <VStack alignItems="start" gap="4">
      <HStack gap="8" alignItems="baseline">
        <h1
          style={{
            fontSize: 36,
            fontWeight: "bold",
          }}
        >
          {title}
        </h1>
        <Text fontSize="lg">
          By{" "}
          <Text as="span" fontWeight="bold">
            {author}
          </Text>
        </Text>
      </HStack>

      <HStack gap="8" alignItems="center">
        <Text>
          Genre:{" "}
          <Text as="span" fontWeight="bold">
            {genre}
          </Text>
        </Text>

        <Text>
          Published in:{" "}
          <Text as="span" fontWeight="bold">
            {publishedYear}
          </Text>
        </Text>
      </HStack>

      <Separator width="full" />

      <MyReview bookId={id} reviews={reviews} />

      <Separator width="full" />

      <BookReviews reviews={reviews} />

      <Box p={4} />
    </VStack>
  );
}
