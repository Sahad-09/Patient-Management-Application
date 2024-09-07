"use client";

import { useRef, useState } from "react";
import { updatePatientDetailAction } from "@/lib/actions"; // Ensure this is the correct import path
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Details } from "@/types"; // Ensure this import is correct

interface EditDetailsProps {
  details: Details;
  userId: string; // Add userId as a prop
}

const EditDetails: React.FC<EditDetailsProps> = ({ details, userId }) => {
  const [chiefComplaint, setChiefComplaint] = useState(
    details.chiefComplaint || ""
  );
  const [existingDisease, setExistingDisease] = useState(
    details.existingDisease || ""
  );
  const [signAndSymptoms, setSignAndSymptoms] = useState(
    details.signAndSymptoms || ""
  );
  const [examinationDetails, setExaminationDetails] = useState(
    details.examinationDetails || ""
  );
  const [labInvestigation, setLabInvestigation] = useState(
    details.labInvestigation || ""
  );
  const [xRaysOrMRs, setXRaysOrMRs] = useState(details.xRaysOrMRs || "");
  const [finalDiagnosis, setFinalDiagnosis] = useState(
    details.finalDiagnosis || ""
  );
  const [treatmentPresented, setTreatmentPresented] = useState(
    details.treatmentPresented || ""
  );
  const [followUp, setFollowUp] = useState(details.followUp || "");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await updatePatientDetailAction(
        details.id, // Details ID
        chiefComplaint,
        existingDisease,
        signAndSymptoms,
        examinationDetails,
        labInvestigation,
        xRaysOrMRs,
        finalDiagnosis,
        treatmentPresented,
        followUp,
        userId // User ID
      );
      formRef.current?.reset();
    } catch (error) {
      console.error("Failed to update patient details:", error);
      // Optionally, show a user-friendly message here
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Details</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Edit Details</SheetTitle>
            <SheetDescription>
              Edit patient details here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mb-5"
          >
            <Label>Chief Complaint</Label>
            <Input
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Chief Complaint"
            />
            <Label>Existing Disease</Label>
            <Input
              value={existingDisease}
              onChange={(e) => setExistingDisease(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Existing Disease"
            />
            <Label>Signs and Symptoms</Label>
            <Input
              value={signAndSymptoms}
              onChange={(e) => setSignAndSymptoms(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Signs and Symptoms"
            />
            <Label>Examination Details</Label>
            <Input
              value={examinationDetails}
              onChange={(e) => setExaminationDetails(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Examination Details"
            />
            <Label>Lab Investigation</Label>
            <Input
              value={labInvestigation}
              onChange={(e) => setLabInvestigation(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Lab Investigation"
            />
            <Label>X-rays or MRIs</Label>
            <Input
              value={xRaysOrMRs}
              onChange={(e) => setXRaysOrMRs(e.target.value)}
              className="text-white"
              type="text"
              placeholder="X-rays or MRIs"
            />
            <Label>Final Diagnosis</Label>
            <Input
              value={finalDiagnosis}
              onChange={(e) => setFinalDiagnosis(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Final Diagnosis"
            />
            <Label>Treatment Presented</Label>
            <Input
              value={treatmentPresented}
              onChange={(e) => setTreatmentPresented(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Treatment Presented"
            />
            <Label>Follow Up</Label>
            <Input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="text-white"
              type="text"
              placeholder="Follow Up"
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save Changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditDetails;
