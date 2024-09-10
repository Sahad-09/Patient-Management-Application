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
import { deletePatientAction } from "@/lib/actions";

interface DeletePatientProps {
  patient: Patient;
  // onDelete: () => void; // Callback to handle post-deletion actions
  onClose: () => void; // Callback to close the dropdown menu
  userId: string;
}
const DeletePatient: React.FC<DeletePatientProps> = ({
  patient,
  onClose,
  userId,
}) => {
  async function handleDelete(id: string) {
    await deletePatientAction(id, userId);
    toast("Patient has been deleted", {
      description: `${patient.name} has been removed from our records.`,
    });
    onClose(); // Close the dropdown menu
    // Optionally, you might want to handle state updates or navigation here.
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="transparentTop">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete {patient.name} ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              patient and remove their data from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(patient.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletePatient;
