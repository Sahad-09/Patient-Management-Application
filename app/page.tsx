import Image from "next/image";
import ModeToggle from "@/components/Mode-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <ModeToggle />
    </main>
  );
}
