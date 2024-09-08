"use client";

import { useRef, useState } from "react";
import { createPatientDetailAction } from "@/lib/actions";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

interface AddDetailsProps {
  userId: string;
}

const AddDetails: React.FC<AddDetailsProps> = ({ userId }) => {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [existingDisease, setExistingDisease] = useState("");
  const [signAndSymptoms, setSignAndSymptoms] = useState("");
  const [examinationDetails, setExaminationDetails] = useState("");
  const [labInvestigation, setLabInvestigation] = useState("");
  const [xRaysOrMRs, setXRaysOrMRs] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");
  const [treatmentPresented, setTreatmentPresented] = useState("");
  const [followUp, setFollowUp] = useState("");

  // State for managing dynamic fields
  const [dynamicFields, setDynamicFields] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Handler for adding a new dynamic field
  const handleAddField = () => {
    setDynamicFields([...dynamicFields, { label: "", value: "" }]);
  };

  // Handler for removing a dynamic field
  const handleRemoveField = (index: number) => {
    setDynamicFields(dynamicFields.filter((_, i) => i !== index));
  };

  // Handler for updating dynamic fields
  const handleFieldChange = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][key] = value;
    setDynamicFields(updatedFields);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await createPatientDetailAction(
        {
          chiefComplaint,
          existingDisease,
          signAndSymptoms,
          examinationDetails,
          labInvestigation,
          xRaysOrMRs,
          finalDiagnosis,
          treatmentPresented,
          followUp,
          dynamicFields, // Include dynamic fields
        },
        userId
      );
      formRef.current?.reset();
      // Optionally close the sheet if needed
    } catch (error) {
      console.error("Failed to add patient details:", error);
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Add Details</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px] overflow-y-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>Add Details</SheetTitle>
            <SheetDescription>
              Add patient details here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 pb-10"
          >
            <div className="space-y-2">
              <Label htmlFor="chiefComplaint">Chief Complaint</Label>
              <Textarea
                id="chiefComplaint"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="text-white"
                placeholder="Chief Complaint"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="existingDisease">Existing Disease</Label>
              <Textarea
                id="existingDisease"
                value={existingDisease}
                onChange={(e) => setExistingDisease(e.target.value)}
                className="text-white"
                placeholder="Existing Disease"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signAndSymptoms">Signs and Symptoms</Label>
              <Textarea
                id="signAndSymptoms"
                value={signAndSymptoms}
                onChange={(e) => setSignAndSymptoms(e.target.value)}
                className="text-white"
                placeholder="Signs and Symptoms"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examinationDetails">Examination Details</Label>
              <Textarea
                id="examinationDetails"
                value={examinationDetails}
                onChange={(e) => setExaminationDetails(e.target.value)}
                className="text-white"
                placeholder="Examination Details"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labInvestigation">Lab Investigation</Label>
              <Textarea
                id="labInvestigation"
                value={labInvestigation}
                onChange={(e) => setLabInvestigation(e.target.value)}
                className="text-white"
                placeholder="Lab Investigation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xRaysOrMRs">X-rays or MRIs</Label>
              <Textarea
                id="xRaysOrMRs"
                value={xRaysOrMRs}
                onChange={(e) => setXRaysOrMRs(e.target.value)}
                className="text-white"
                placeholder="X-rays or MRIs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalDiagnosis">Final Diagnosis</Label>
              <Textarea
                id="finalDiagnosis"
                value={finalDiagnosis}
                onChange={(e) => setFinalDiagnosis(e.target.value)}
                className="text-white"
                placeholder="Final Diagnosis"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatmentPresented">Treatment Presented</Label>
              <Textarea
                id="treatmentPresented"
                value={treatmentPresented}
                onChange={(e) => setTreatmentPresented(e.target.value)}
                className="text-white"
                placeholder="Treatment Presented"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="followUp">Follow Up</Label>
              <Textarea
                id="followUp"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="text-white"
                placeholder="Follow Up"
              />
            </div>

            {/* Dynamic fields */}
            <div className="space-y-2 mt-4">
              <Label>Dynamic Fields</Label>
              {dynamicFields.map((field, index) => (
                <div key={index} className="space-y-2 mt-2">
                  <Input
                    type="text"
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) =>
                      handleFieldChange(index, "label", e.target.value)
                    }
                    className="text-white"
                  />
                  <Textarea
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(index, "value", e.target.value)
                    }
                    className="text-white mt-1"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveField(index)}
                    className="mt-1"
                  >
                    Remove Field
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddField} className="mt-2">
                Add Dynamic Field
              </Button>
            </div>

            <SheetFooter className="mt-5">
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

export default AddDetails;
