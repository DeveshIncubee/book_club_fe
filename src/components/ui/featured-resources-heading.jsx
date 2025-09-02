"use client";

import Link from "next/link";

export default function FeaturedResourcesHeading({ resourceType }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #9ca3af",
      }}
    >
      <p>Featured {resourceType === "book" ? "Books" : "Events"}</p>
      <Link href={`${resourceType === "book" ? "/books" : "/events"}`}>
        View All
      </Link>
    </div>
  );
}
