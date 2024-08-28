// components/navbar.tsx
import Link from "next/link";
import ModeToggle from "@/components/Mode-toggle"

export default function Navbar() {
  return (
    <nav className="">
     <ModeToggle />
    </nav>
  );
}
