import { Avatar, Box, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import UnAttendActionBar from "@/components/ui/un-attend-action-bar";
import { query } from "@/lib/client";
import { GET_EVENT_BY_ID } from "@/lib/queries";

export default async function EventDetailPage({ params }) {
  const { id } = await params;

  const { data, error } = await query({
    query: GET_EVENT_BY_ID,
    variables: { eventId: id },
  });

  if (error) {
    notFound();
  }

  const { event } = await data;

  const { title, description, location, host, startsAt, endsAt, attendees } =
    await event;

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
          Hosted By{" "}
          <Text as="span" fontWeight="bold">
            {host?.name}
          </Text>
        </Text>
      </HStack>

      <Text>
        Location:{" "}
        <Text as="span" fontWeight="bold">
          {location}
        </Text>
      </Text>

      <Text>
        Starts on:{" "}
        <Text as="span" fontWeight="bold">
          {format(startsAt, "do LLL yyyy, hh:mm a z")}
        </Text>
      </Text>

      <Text>
        Ends on:{" "}
        <Text as="span" fontWeight="bold">
          {format(endsAt, "do LLL yyyy, hh:mm a z")}
        </Text>
      </Text>

      <UnAttendActionBar eventId={id} host={host} attendees={attendees} />

      <Separator width="full" />

      <Text>{description}</Text>

      {attendees?.length > 0
        ? <VStack alignItems="stretch" gap="4" w="full">
            <Separator width="full" />

            <VStack alignItems="start" gap="4">
              <h3 style={{ fontSize: 24 }}>Attendees ({attendees?.length})</h3>
              {attendees?.map((attendee, index) => (
                <VStack
                  key={`attendee-${index + 1}`}
                  alignItems="start"
                  gap="4"
                >
                  <HStack alignItems="center" gap="4">
                    <Avatar.Root variant="subtle">
                      <Avatar.Fallback name={attendee?.name} />
                    </Avatar.Root>
                    <Text style={{ fontSize: 18 }}>{attendee?.name}</Text>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </VStack>
        : <div />}
      <Box p={4} />
    </VStack>
  );
}
