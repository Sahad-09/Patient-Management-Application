import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="mt-16 max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {session ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-lg">
                  Welcome, {session.user?.name}
                </p>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
            </div>
            <div className="space-x-4">
              <Link
                href="/patients"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Go to patients
              </Link>
              <Link
                href="/api/auth/signout"
                className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Sign out
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">
              Please sign in to access the patient management system.
            </p>
            <Link
              href="/api/auth/signin"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
