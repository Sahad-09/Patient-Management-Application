import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import { deletePatientsAction } from "@/lib/actions";

interface DeletePatientsProps {
  selectedPatients: Patient[];
  onDelete: () => void;
}

const DeletePatients: React.FC<DeletePatientsProps> = ({
  selectedPatients,
  onDelete,
}) => {
  async function handleDelete() {
    const ids = selectedPatients.map((patient) => patient.id);
    await deletePatientsAction(ids);
    toast("Patients have been deleted", {
      description: `${selectedPatients.length} patient(s) have been removed from our records.`,
    });
    onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={selectedPatients.length === 0}>
          Delete Selected ({selectedPatients.length})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete these patients?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected patients and remove their data from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, delete {selectedPatients.length} patient(s)
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePatients;
