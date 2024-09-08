import React from "react";
import { getPatientDetails } from "@/lib/details";
import { getPatient } from "@/lib/patients";
import { Details, Patient } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditDetails from "@/components/DetailsComponents/EditDetails";
import AddDetails from "@/components/DetailsComponents/AddDetails";
import { Separator } from "@/components/ui/separator";

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

  if ("error" in detailResponse) {
    return <div>Error: {JSON.stringify(detailResponse.error)}</div>;
  }

  if ("error" in patientResponse) {
    return <div>Error: {JSON.stringify(patientResponse.error)}</div>;
  }

  const { patientDetails } = detailResponse;
  const { patient } = patientResponse;

  if (!patientDetails || !Array.isArray(patientDetails)) {
    return <div>No patient details available</div>;
  }

  const validPatientDetails = patientDetails
    .filter(isValidDetails)
    .map(transformDetails);

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto bg-dark-blue text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientInfo patient={patient} />
          <Separator className="my-6" />

          <ScrollArea className="h-[400px] pr-4">
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

function PatientInfo({ patient }: { patient: Patient | undefined }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <InfoItem label="Name" value={patient?.name} />
      <InfoItem label="Age" value={patient?.age} />
      <InfoItem label="Sex" value={patient?.sex} />
      <InfoItem label="Contact" value={patient?.contact} />
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-300">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
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
    <div>
      <dt className="text-lg font-medium text-gray-400">{label}</dt>
      <dd className="text-sm text-gray-100 mb-3">{value}</dd>
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
    <Card className="mb-4 bg-dark-blue text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold mb-4">
          Patient Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
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
      <CardFooter>
        <EditDetails details={detail} userId={userId} />
      </CardFooter>
    </Card>
  );
}

function NoPatientDetails({ userId }: { userId: string }) {
  return (
    <>
      <h1>No Patient Details</h1>
      <CardFooter>
        <AddDetails userId={userId} />
      </CardFooter>
    </>
  );
}
