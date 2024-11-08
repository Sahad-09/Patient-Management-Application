import React from "react";
import { Tablee } from "../../components/Table/Tablee";
import { getPatients } from "@/lib/patients";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const PatientsPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("Session ", session);

  if (!session || !session.user?.id) {
    redirect("/api/auth/signin");
  }

  const { patients } = await getPatients(session.user.id);
  console.log("Patientsss", patients);
  console.log("Patientsss", session.user.id);

  const userId = session.user.id;
  return (
    <div className=" m-6 pt-20">
      <Tablee patients={patients} userId={userId} />
    </div>
  );
};

export default PatientsPage;
