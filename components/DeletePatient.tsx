import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Patient } from "@/types";
import { deletePatientAction } from "@/lib/actions";

interface DeletePatientProps {
  patient: Patient;
}

const DeletePatient: React.FC<DeletePatientProps> = ({ patient }) => {
  async function handleDelete(id: string) {
    await deletePatientAction(id);
  }

  return (
    <div>
      <DropdownMenuItem onClick={() => handleDelete(patient.id)}>
        Delete
      </DropdownMenuItem>
    </div>
  );
};

export default DeletePatient;
