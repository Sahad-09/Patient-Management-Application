// app/navbar.tsx (or any appropriate server component file)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return <NavbarClient session={session} />;
}
