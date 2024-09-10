import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import EditPatient from "@/components/PatientComponents/EditPatient";
import DeletePatient from "@/components/PatientComponents/DeletePatient";
import { Patient } from "@/types";

interface ActionsDropdownProps {
  patient: Patient;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ patient }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditPatient
          patient={patient}
          onClose={handleClose}
          userId={patient.userId}
        />
        <DeletePatient
          patient={patient}
          onClose={handleClose}
          userId={patient.userId}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
