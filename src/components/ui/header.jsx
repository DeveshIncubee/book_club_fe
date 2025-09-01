"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="rounded-full bg-gray-200 my-4 px-4 py-2 flex justify-between items-center">
      <Link href="/">
        <p className="font-mono text-2xl">Book Club</p>
      </Link>

      <div className="flex space-x-4 items-center">
        <Link
          href="/books"
          className={`${pathname.includes("/books") ? "font-bold" : ""} text-xl hover:underline`}
        >
          Books
        </Link>
        <Link
          href="/events"
          className={`${pathname.includes("/events") ? "font-bold" : ""} text-xl hover:underline`}
        >
          Events
        </Link>
      </div>
    </header>
  );
}
