import React from "react";
import { getPatientDetails } from "@/lib/details";
import EditDetails from "@/components/DetailsComponents/EditDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Details, Patient } from "@/types"; // Import the correct types

const defaultDetails: Details = {
  id: "",
  chiefComplaint: null,
  existingDisease: null,
  signAndSymptoms: null,
  examinationDetails: null,
  labInvestigation: null,
  xRaysOrMRs: null,
  finalDiagnosis: null,
  treatmentPresented: null,
  followUp: null,
};

export default async function Page({ params }: { params: { id: string } }) {
  const { patientDetails } = await getPatientDetails(params.id);

  if (!patientDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-600">Patient Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              The requested patient information could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const detailsFields = [
    { key: "chiefComplaint", label: "Chief Complaint" },
    { key: "existingDisease", label: "Existing Disease" },
    { key: "signAndSymptoms", label: "Signs and Symptoms" },
    { key: "examinationDetails", label: "Examination Details" },
    { key: "labInvestigation", label: "Lab Investigation" },
    { key: "xRaysOrMRs", label: "X-rays or MRIs" },
    { key: "finalDiagnosis", label: "Final Diagnosis" },
    { key: "treatmentPresented", label: "Treatment Presented" },
    { key: "followUp", label: "Follow Up" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Information</CardTitle>
          {/* <CardDescription>ID: {params.id}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold">{patientDetails.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-semibold">{patientDetails.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sex</p>
              <p className="text-lg font-semibold">{patientDetails.sex}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-lg font-semibold">{patientDetails.contact}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
          {patientDetails.Details ? (
            <ScrollArea className="h-[400px] pr-4">
              {detailsFields.map(({ key, label }) => {
                const detailValue =
                  patientDetails.Details?.[
                    key as keyof typeof patientDetails.Details
                  ];
                return (
                  detailValue && (
                    <div key={key} className="mb-4">
                      <p className="text-sm font-medium text-gray-500">
                        {label}
                      </p>
                      <p className="text-base">{detailValue}</p>
                    </div>
                  )
                );
              })}
            </ScrollArea>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Details Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No additional details are available for this patient.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter>
          <EditDetails
            details={patientDetails.Details || defaultDetails}
            userId={params.id}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
