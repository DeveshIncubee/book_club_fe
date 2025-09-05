import { Box, Separator, VStack } from "@chakra-ui/react";
import BookForm from "@/components/ui/book-form";

export default function AddBookPage() {
  return (
    <VStack alignItems="stretch" gap="4" width="full">
      <h1
        style={{
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        Add Book
      </h1>

      <Separator />

      <BookForm />

      <Box p={4} />
    </VStack>
  );
}
