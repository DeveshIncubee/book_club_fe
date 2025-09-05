"use client";
import { useQuery } from "@apollo/client/react";
import { Flex, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ALL_EVENTS } from "@/lib/queries";
import Event from "./event";

function EventSkeleton({ idx }) {
  return (
    <Stack
      gap="6"
      width={{ base: "100%", md: "25%" }}
      data-testid={`event-skeleton-${idx}`}
    >
      <SkeletonText noOfLines={3} />
      <Skeleton height="140px" />
    </Stack>
  );
}

export default function AllEvents() {
  const { data } = useQuery(ALL_EVENTS);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      setEvents(data?.events);
    }
  }, [data]);

  return (
    <Flex wrap="wrap" alignItems="stretch" gap="10" mt="3">
      {events?.length > 0 ? (
        events?.map((event, index) => (
          <Event key={`event-${index + 1}`} event={event} />
        ))
      ) : (
        <>
          <EventSkeleton idx={1} />
          <EventSkeleton idx={2} />
          <EventSkeleton idx={3} />
          <EventSkeleton idx={4} />
          <EventSkeleton idx={5} />
          <EventSkeleton idx={6} />
        </>
      )}
    </Flex>
  );
}
