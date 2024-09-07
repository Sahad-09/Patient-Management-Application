import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import { deletePatientAction } from "@/lib/actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

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
      <Button variant="transparentTop" onClick={() => handleDelete(patient.id)}>
        Delete
      </Button>
    </div>
  );
};

export default DeletePatient;
