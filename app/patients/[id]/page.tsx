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

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto bg-dark-blue text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-300">Name</p>
              <p className="text-lg font-semibold">{patient?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Age</p>
              <p className="text-lg font-semibold">{patient?.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Sex</p>
              <p className="text-lg font-semibold">{patient?.sex}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Contact</p>
              <p className="text-lg font-semibold">{patient?.contact}</p>
            </div>
          </div>
          <Separator className="my-6" />

          {/* <h3 className="text-xl font-semibold mb-4">Patient Details</h3> */}
          <ScrollArea className="h-[400px] pr-4">
            {patientDetails && patientDetails.length > 0 ? (
              patientDetails.map((detail: Details) => (
                <Card key={detail.id} className="mb-4 bg-dark-blue text-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold mb-4">
                      Patient Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <DetailItem
                        label="Chief Complaint"
                        value={detail.chiefComplaint}
                      />
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
              ))
            ) : (
              <>
                <h1>No Patient Details</h1>
                <CardFooter>
                  <AddDetails userId={id} />
                </CardFooter>
              </>
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
  return (
    <div>
      <dt className="text-lg font-medium text-gray-400">{label}</dt>
      <dd className="text-sm text-gray-100 mb-3">{value || "N/A"}</dd>
    </div>
  );
}
