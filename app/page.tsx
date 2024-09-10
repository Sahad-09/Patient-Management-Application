import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If the user is signed in, redirect to /patients
  if (session) {
    redirect("/patients");
  }

  // Render home content if no session
  return (
    <section>
      <Dashboard />
    </section>
  );
}
