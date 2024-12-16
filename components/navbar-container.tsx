"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarContainer() {
  const pathname = usePathname();
  const isUsernameRoute =
    pathname?.split("/").length === 2 &&
    pathname !== "/" &&
    pathname !== "/admin" &&
    pathname !== "/create" &&
    pathname !== "/sign-in" &&
    pathname !== "/sign-up";

  if (isUsernameRoute) {
    return null;
  }

  return <Navbar />;
}