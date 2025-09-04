import { Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export default function Book({ book }) {
  return (
    <VStack
      width={{ base: "100%", md: "25%" }}
      gap="10"
      justifyContent="space-between"
      alignItems="start"
      border="1px solid var(--gray)"
      padding="4"
      borderRadius="xl"
      data-testid={`book-${book?.id}`}
    >
      <VStack gap="1" alignItems="start">
        <Text fontSize="xl" fontWeight="bold">
          {book?.title}
        </Text>
        <Text fontSize="md">By {book?.author}</Text>
      </VStack>

      <VStack gap="2" alignItems="start">
        <Text fontSize="md">
          {book?.genre ? book?.genre : ""}
          {book?.genre && book?.publishedYear ? " / " : ""}
          {book?.publishedYear ? book?.publishedYear : ""}
        </Text>
        <Button variant="outline" asChild>
          <Link href={`/books/${book?.id}`} className="no-hover-underline">
            View Book <RiArrowRightLine />
          </Link>
        </Button>
      </VStack>
    </VStack>
  );
}
