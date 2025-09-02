"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        border: "none",
        borderRadius: "calc(infinity * 1px)",
        backgroundColor: "#e5e7eb",
        margin: "16px 0",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <p style={{ margin: 0, fontSize: "24px" }}>Book Club</p>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          href="/books"
          style={{
            fontWeight: pathname?.includes("/books") ? "bold" : "normal",
            fontSize: 20,
          }}
        >
          Books
        </Link>
        <Link
          href="/events"
          style={{
            fontWeight: pathname?.includes("/events") ? "bold" : "normal",
            fontSize: 20,
            marginLeft: "1rem",
          }}
        >
          Events
        </Link>
      </div>
    </header>
  );
}
