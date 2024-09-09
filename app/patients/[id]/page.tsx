import React from "react";
import { getPatientDetails } from "@/lib/details";
import { getPatient } from "@/lib/patients";
import { Details, Patient } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddDetails from "@/components/DetailsComponents/AddDetails";
import EditDetails from "@/components/DetailsComponents/EditDetails";

interface PageProps {
  params: {
    id: string;
  };
}

function isValidDetails(detail: any): detail is Details {
  return (
    typeof detail.id === "string" &&
    (detail.chiefComplaint === null ||
      typeof detail.chiefComplaint === "string") &&
    (detail.existingDisease === null ||
      typeof detail.existingDisease === "string") &&
    (detail.signAndSymptoms === null ||
      typeof detail.signAndSymptoms === "string") &&
    (detail.examinationDetails === null ||
      typeof detail.examinationDetails === "string") &&
    (detail.labInvestigation === null ||
      typeof detail.labInvestigation === "string") &&
    (detail.xRaysOrMRs === null || typeof detail.xRaysOrMRs === "string") &&
    (detail.finalDiagnosis === null ||
      typeof detail.finalDiagnosis === "string") &&
    (detail.treatmentPresented === null ||
      typeof detail.treatmentPresented === "string") &&
    (detail.followUp === null || typeof detail.followUp === "string") &&
    (detail.dynamicFields === undefined ||
      detail.dynamicFields === null ||
      Array.isArray(detail.dynamicFields))
  );
}

function transformDetails(detail: any): Details {
  return {
    ...detail,
    dynamicFields: Array.isArray(detail.dynamicFields)
      ? detail.dynamicFields.map((field: any) => ({
          label: String(field.label),
          value: String(field.value),
        }))
      : null,
  };
}

export default async function Page({ params }: PageProps) {
  const detailResponse = await getPatientDetails(params.id);
  const patientResponse = await getPatient(params.id);
  const { id } = params;

  if ("error" in detailResponse || "error" in patientResponse) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Error:{" "}
            {JSON.stringify(
              "error" in detailResponse
                ? detailResponse.error
                : patientResponse.error
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const { patientDetails } = detailResponse;
  const { patient } = patientResponse;

  if (!patientDetails || !Array.isArray(patientDetails)) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">No patient details available</div>
        </CardContent>
      </Card>
    );
  }

  const validPatientDetails = patientDetails
    .filter(isValidDetails)
    .map(transformDetails);

  return (
    <div className="container my-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient?.name}`}
              />
              <AvatarFallback>{patient?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">
                {patient?.name}
              </CardTitle>
              <div className="flex space-x-2 mt-2">
                <Badge variant="outline">{patient?.age} years</Badge>
                <Badge variant="outline">{patient?.sex}</Badge>
                <Badge variant="outline">{patient?.contact}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4 mt-4">
            {validPatientDetails.length > 0 ? (
              validPatientDetails.map((detail) => (
                <PatientDetailCard
                  key={detail.id}
                  detail={detail}
                  userId={id}
                />
              ))
            ) : (
              <NoPatientDetails userId={id} />
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="mb-6">
      <dt className="text-xl font-medium text-blue-300">{label}</dt>
      <dd className="mt-2 text-lg text-gray-100">{value}</dd>
    </div>
  );
}

function PatientDetailCard({
  detail,
  userId,
}: {
  detail: Details;
  userId: string;
}) {
  return (
    <Card className="mb-6">
      <CardHeader className=" flex flex-row justify-between">
        <CardTitle className="text-3xl font-semibold">Visit Details</CardTitle>
        <EditDetails details={detail} userId={userId} />
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <DetailItem label="Chief Complaint" value={detail.chiefComplaint} />
          <DetailItem label="Existing Disease" value={detail.existingDisease} />
          <DetailItem
            label="Signs and Symptoms"
            value={detail.signAndSymptoms}
          />
          <DetailItem
            label="Examination Details"
            value={detail.examinationDetails}
          />
          <DetailItem
            label="Lab Investigation"
            value={detail.labInvestigation}
          />
          <DetailItem label="X-rays or MRIs" value={detail.xRaysOrMRs} />
          <DetailItem label="Final Diagnosis" value={detail.finalDiagnosis} />
          <DetailItem
            label="Treatment Presented"
            value={detail.treatmentPresented}
          />
          <DetailItem label="Follow-up" value={detail.followUp} />

          {detail.dynamicFields?.map((field, index) => (
            <DetailItem key={index} label={field.label} value={field.value} />
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

function NoPatientDetails({ userId }: { userId: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">No Patient Details</h2>
        <AddDetails userId={userId} />
      </CardContent>
    </Card>
  );
}
