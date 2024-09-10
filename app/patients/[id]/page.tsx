import React from "react";
import { getPatientDetails } from "@/lib/details";
import { getPatient } from "@/lib/patients";
import { Details, Patient } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AddDetails from "@/components/DetailsComponents/AddDetails";
import EditDetails from "@/components/DetailsComponents/EditDetails";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/api/auth/signin");
  }

  const userId = session.user.id;
  const patientId = params.id;

  const detailResponse = await getPatientDetails(patientId);
  const patientResponse = await getPatient(patientId, userId);

  if ("error" in detailResponse || "error" in patientResponse) {
    return (
      <Card className="w-full max-w-5xl mx-auto mt-28">
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

  if (!patient) {
    return (
      <Card className="w-full max-w-5xl mx-auto mt-28">
        <CardContent className="pt-6">
          <div className="text-center">Patient not found or access denied</div>
        </CardContent>
      </Card>
    );
  }

  if (!patientDetails || !Array.isArray(patientDetails)) {
    return (
      <Card className="w-full max-w-5xl mx-auto mt-28">
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
    <div className="container mx-auto pt-28">
      <Card className="w-full max-w-5xl mx-auto">
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
          {validPatientDetails.length > 0 ? (
            validPatientDetails.map((detail) => (
              <PatientDetailSection
                key={detail.id}
                detail={detail}
                userId={userId}
                patientId={patientId}
              />
            ))
          ) : (
            <NoPatientDetails userId={userId} patientId={patientId} />
          )}
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
      <dt className="text-lg font-medium text-blue-300 mb-2">{label}</dt>
      <dd className="text-base text-gray-100 whitespace-pre-wrap break-words">
        {value}
      </dd>
    </div>
  );
}

function PatientDetailSection({
  detail,
  userId,
  patientId,
}: {
  detail: Details;
  userId: string;
  patientId: string;
}) {
  return (
    <div className="mb-8 border-b border-gray-700 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Visit Details</h3>
        <EditDetails details={detail} userId={userId} patientId={patientId} />
      </div>
      <dl className="space-y-4">
        <DetailItem label="Chief Complaint" value={detail.chiefComplaint} />
        <DetailItem label="Existing Disease" value={detail.existingDisease} />
        <DetailItem label="Signs and Symptoms" value={detail.signAndSymptoms} />
        <DetailItem
          label="Examination Details"
          value={detail.examinationDetails}
        />
        <DetailItem label="Lab Investigation" value={detail.labInvestigation} />
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
    </div>
  );
}

function NoPatientDetails({
  userId,
  patientId,
}: {
  userId: string;
  patientId: string;
}) {
  return (
    <div className="text-center py-8">
      <h2 className="text-xl font-semibold mb-4 text-[#721B1C]">
        No Patient Details
      </h2>
      <AddDetails userId={patientId} />
    </div>
  );
}
