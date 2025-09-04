"use client";

import { Button } from "@chakra-ui/react";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function UnAttendActionBar({ eventId, host, attendees }) {
  const { currentUser } = useCurrentUser();

  console.log(eventId);

  return (
    <>
      {host?.id !== currentUser?.id ? (
        attendees?.find((attendee) => attendee?.id === currentUser?.id) ? (
          <Button variant="outline">Unattend Event</Button>
        ) : (
          <Button>Attend Event</Button>
        )
      ) : null}
    </>
  );
}
