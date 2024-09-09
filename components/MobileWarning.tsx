import React from "react";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MobileWarning = () => {
  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    isMobile && (
      <div
        className={cn(
          "fixed top-0 left-0 w-full bg-gray-900 text-white p-4 text-center",
          fontSans.variable
        )}
      >
        <p>
          Our site is currently optimized for desktop use. For a smoother
          experience, please access it from a computer.
        </p>
      </div>
    )
  );
};

export default MobileWarning;
