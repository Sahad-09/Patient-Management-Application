"use client";

import { useRef, useState } from "react";
import { updatePatientDetailAction } from "@/lib/actions";
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
import { Input } from "@/components/ui/input";
import { Details } from "@/types";

interface EditDetailsProps {
  details: Details;
  userId: string;
}

const EditDetails: React.FC<EditDetailsProps> = ({ details, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  // State for managing dynamic fields
  const [dynamicFields, setDynamicFields] = useState<
    { label: string; value: string }[]
  >(
    details.dynamicFields || [] // Initialize with existing dynamic fields
  );

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
      await updatePatientDetailAction(
        details.id,
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
    } catch (error) {
      console.error("Failed to update patient details:", error);
    }
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Edit Details</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px] overflow-y-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>Edit Details</SheetTitle>
            <SheetDescription>
              Edit patient details here. Click save when you're done.
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
            <div className="space-y-2 mt-4 flex flex-col">
              <Label>Custom Fields (Add if Required)</Label>
              {dynamicFields.map((field, index) => (
                <div key={index} className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter Side Heading"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(index, "label", e.target.value)
                      }
                      className="text-white flex-grow"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveField(index)}
                      className="px-2 py-1 h-auto"
                    >
                      X
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Enter Information Here"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(index, "value", e.target.value)
                    }
                    className="text-white mt-1"
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddField} className="mt-2">
                Add Custom Field
              </Button>
            </div>

            <SheetFooter className="mt-5 flex justify-between">
              <Button
                type="button"
                onClick={() => {
                  formRef.current?.reset();
                  setIsOpen(false); // Close the sheet when cancel is clicked
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <SheetClose asChild>
                <Button variant="addPatient" type="submit">
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditDetails;
