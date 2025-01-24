"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isDashboardPath = pathname?.startsWith("/dashboard");

  return !isDashboardPath ? <Navbar /> : null;
}
