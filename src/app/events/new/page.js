import { Box, Separator, VStack } from "@chakra-ui/react";
import EventForm from "@/components/ui/event-form";

export default function AddEventPage() {
  return (
    <VStack alignItems="stretch" gap="4" width="full">
      <h1
        style={{
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        Add Event
      </h1>

      <Separator />

      <EventForm />

      <Box p={4} />
    </VStack>
  );
}
