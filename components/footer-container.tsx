"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterContainer() {
  const pathname = usePathname();
  const isUsernameRoute =
    pathname?.split("/").length === 2 &&
    pathname !== "/" &&
    pathname !== "/create" &&
    pathname !== "/sign-in" &&
    pathname !== "/sign-up";

  if (
    isUsernameRoute ||
    pathname === "/admin/" ||
    pathname === "/admin/styles" ||
    pathname === "/admin/analytics"
  ) {
    return null;
  }

  return <Footer />;
}