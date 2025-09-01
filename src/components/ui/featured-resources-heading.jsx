"use client";

import Link from "next/link";

export default function FeaturedResourcesHeading({ resourceType }) {
  return (
    <div className="flex justify-between items-center border-b borderb-b-gray-400">
      <p>Featured {resourceType === "book" ? "Books" : "Events"}</p>
      <Link href={`${resourceType === "book" ? "/books" : "/events"}`}>
        View All
      </Link>
    </div>
  );
}
