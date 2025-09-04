"use client";
import { useQuery } from "@apollo/client/react";
import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FEATURED_EVENTS } from "@/lib/queries";
import FeaturedEvent from "./featured-event";

function FeaturedEventSkeleton({ idx }) {
  return (
    <Stack
      gap="6"
      width={{ base: "100%", md: "25%" }}
      data-testid={`featured-event-skeleton-${idx}`}
    >
      <SkeletonText noOfLines={3} />
      <Skeleton height="145px" />
    </Stack>
  );
}

export default function FeaturedEvents() {
  const { data } = useQuery(FEATURED_EVENTS);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      setEvents(data?.events);
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
      {events?.length > 0 ? (
        events?.map((event, index) => (
          <FeaturedEvent key={`featured-event-${index + 1}`} event={event} />
        ))
      ) : (
        <>
          <FeaturedEventSkeleton idx={1} />
          <FeaturedEventSkeleton idx={2} />
          <FeaturedEventSkeleton idx={3} />
          <FeaturedEventSkeleton idx={4} />
        </>
      )}
    </Stack>
  );
}
