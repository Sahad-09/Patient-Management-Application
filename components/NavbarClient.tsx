"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/Mode-toggle";

interface NavbarClientProps {
  session: any; // Adjust the type as per your session shape
}

export default function NavbarClient({ session }: NavbarClientProps) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redirect to /patients if the user is signed in
      router.push("/patients");
    }
  }, [session, router]);

  return (
    <nav className="flex justify-between items-center p-4 rounded-lg bg-transparent shadow-md border border-gray-300 dark:border-gray-700 absolute top-3 left-2 right-2 mx-auto">
      {/* Left side: Mode Toggle */}
      <div>
        <ModeToggle />
      </div>

      {/* Right side: Authentication section */}
      <div className="flex items-center space-x-4">
        {session ? (
          <div className="flex items-center space-x-4">
            {/* User profile picture */}
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            {/* User name */}
            <p className="text-gray-800 dark:text-white">
              {session.user?.name}
            </p>

            {/* Sign out button */}
            <Link
              href="/api/auth/signout"
              className="bg-[#41131A] text-white px-3 py-2 rounded hover:bg-[#721B1C] transition-colors"
            >
              Sign out
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            {/* Sign in button */}
            <Link
              href="/api/auth/signin"
              className="bg-[#32CD32] text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
