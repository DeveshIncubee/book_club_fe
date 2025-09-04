import { Button, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export default function FeaturedEvent({ event }) {
  return (
    <VStack
      width={{ base: "100%", md: "25%" }}
      gap="10"
      justifyContent="space-between"
      alignItems="start"
      border="1px solid var(--gray)"
      padding="4"
      borderRadius="xl"
      data-testid={`featured-event-${event?.id}`}
    >
      <VStack gap="1" alignItems="start">
        <Text fontSize="xl" fontWeight="bold">
          {event?.title}
        </Text>
        <Text fontSize="md">Hosted By {event?.host?.name}</Text>
      </VStack>

      <VStack gap="2" alignItems="start">
        <Text fontSize="md">
          {event?.location}
          {event?.startsAt ? ` / ${format(event?.startsAt, "do LLL")}` : ""}
        </Text>
        <Button variant="outline" asChild>
          <Link href={`/event/${event?.id}`} className="no-hover-underline">
            View Event <RiArrowRightLine />
          </Link>
        </Button>
      </VStack>
    </VStack>
  );
}
