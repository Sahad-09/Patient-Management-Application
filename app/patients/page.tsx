import React from "react";
import { Tablee } from "./Tablee";
import { getPatients } from "@/lib/patients";

const page = async () => {
  const { patients } = await getPatients();
  console.log(patients);

  return (
    <div>
      <Tablee patients={patients} />
    </div>
  );
};

export default page;
