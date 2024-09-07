import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import { deletePatientAction } from "@/lib/actions";

interface DeletePatientProps {
  patient: Patient;
}

const DeletePatient: React.FC<DeletePatientProps> = ({ patient }) => {
  async function handleDelete(id: string) {
    await deletePatientAction(id);
    // Optionally, you might want to provide user feedback or handle state updates here.
  }

  return (
    <div>
      <Button variant="destructive" onClick={() => handleDelete(patient.id)}>
        Delete
      </Button>
    </div>
  );
};

export default DeletePatient;
