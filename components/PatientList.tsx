// import { revalidatePatients } from '@/lib/actions';
import { Button } from "@/components/ui/button";
import { Patient } from "../types"; // Adjust the path as needed

interface PatientsProps {
  patient: Patient;
}

export default async function Patients({ patient }: PatientsProps) {
  return (
    <section className="mt-16">
      <h1>{patient.id}</h1>
      <h1>{patient.name}</h1>
      <h1>{patient.contact}</h1>
      <h1>{patient.sex}</h1>
    </section>
  );
}
