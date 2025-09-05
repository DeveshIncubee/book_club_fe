"use client";

import { useMutation } from "@apollo/client/react";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { ATTEND_EVENT, UNATTEND_EVENT } from "@/lib/queries";

export default function UnAttendActionBar({ eventId, host, attendees }) {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  const [loading, setLoading] = useState(true);
  const [attendEvent, { attending }] = useMutation(ATTEND_EVENT);
  const [unattendEvent, { unattending }] = useMutation(UNATTEND_EVENT);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <Stack width={{ base: "50%", md: "25%" }}>
        <Skeleton height="40px" />
      </Stack>
    );
  }

  return (
    <>
      {host?.id !== currentUser?.id ? (
        attendees?.find((attendee) => attendee?.id === currentUser?.id) ? (
          <Button
            variant="outline"
            loading={unattending}
            onClick={() => {
              unattendEvent({
                variables: {
                  userId: currentUser?.id,
                  eventId: eventId,
                },
              });
              router.refresh();
            }}
          >
            Unattend Event
          </Button>
        ) : (
          <Button
            loading={attending}
            onClick={() => {
              attendEvent({
                variables: {
                  userId: currentUser?.id,
                  eventId: eventId,
                },
              });
              router.refresh();
            }}
          >
            Attend Event
          </Button>
        )
      ) : null}
    </>
  );
}
