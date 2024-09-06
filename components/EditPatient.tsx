import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Patient } from "@/types";
import { deletePatientAction } from "@/lib/actions";

interface DeletePatientProps {
  patient: Patient;
}

const EditPatient: React.FC<DeletePatientProps> = ({ patient }) => {
  return (
    <div>
      <DropdownMenuItem
        onClick={() => alert(`Edit patient with ID: ${patient.id}`)}
      >
        Edit
      </DropdownMenuItem>
    </div>
  );
};

export default EditPatient;
