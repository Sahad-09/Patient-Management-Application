import React from "react";
import { Tablee } from "./Tablee";
import { getPatients } from "@/lib/patients";
import { NewPatientForm } from "@/components/NewPatientForm";

const page = async () => {
  const { patients } = await getPatients();
  console.log(patients);

  return (
    <div>
      <NewPatientForm />
      <Tablee patients={patients} />
    </div>
  );
};

export default page;
