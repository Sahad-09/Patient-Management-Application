import React from "react";
import { getPatientDetails } from "@/lib/details";
import { Details } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditDetails from "@/components/DetailsComponents/EditDetails";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const response = await getPatientDetails(params.id);
  const { id } = params;

  if ("error" in response) {
    return <div>Error: {JSON.stringify(response.error)}</div>;
  }

  const { patientDetails } = response;
  if (!patientDetails || !Array.isArray(patientDetails)) {
    return <div>No patient details available</div>;
  }

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold">Sahad</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-semibold">50</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sex</p>
              <p className="text-lg font-semibold">Male</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-lg font-semibold">6363024288</p>
            </div>
          </div>
          <Separator className="my-6" />

          <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
          <ScrollArea className="h-[400px] pr-4">
            {patientDetails.map((detail: Details) => (
              <Card key={detail.id} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    {detail.chiefComplaint || "No Chief Complaint"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <DetailItem
                      label="Existing Disease"
                      value={detail.existingDisease}
                    />
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
                    <DetailItem
                      label="X-rays or MRIs"
                      value={detail.xRaysOrMRs}
                    />
                    <DetailItem
                      label="Final Diagnosis"
                      value={detail.finalDiagnosis}
                    />
                    <DetailItem
                      label="Treatment Presented"
                      value={detail.treatmentPresented}
                    />
                    <DetailItem label="Follow-up" value={detail.followUp} />
                  </dl>
                </CardContent>
                <CardFooter>
                  <EditDetails details={detail} userId={id} />
                </CardFooter>
              </Card>
            ))}
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
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{value || "N/A"}</dd>
    </div>
  );
}
