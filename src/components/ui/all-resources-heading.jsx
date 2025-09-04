"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddFill } from "react-icons/ri";

export default function AllResourcesHeading({ resourceType }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #9ca3af",
        paddingBottom: 4,
      }}
    >
      <p>All {resourceType === "book" ? "Books" : "Events"}</p>
      <Button variant="outline" asChild>
        <Link
          href={`${resourceType === "book" ? "/books/new" : "/events/new"}`}
          className="no-hover-underline"
        >
          Add {resourceType === "book" ? "Book" : "Event"} <RiAddFill />
        </Link>
      </Button>
    </div>
  );
}
