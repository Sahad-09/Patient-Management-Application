import React from "react";
import { getPatientDetails } from "@/lib/details";
import { Details } from "@/types"; // Import types from types.d.ts
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditDetails from "@/components/DetailsComponents/EditDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const response = await getPatientDetails(params.id);
  const { id } = params; // Extract userId
  console.log("Idddddddd", id);

  // Handle the response
  if ("error" in response) {
    // Handle error case
    return <div>Error: {JSON.stringify(response.error)}</div>;
  }

  const { patientDetails } = response;

  // Ensure patientDetails is defined and is an array
  if (!patientDetails || !Array.isArray(patientDetails)) {
    return <div>No patient details available</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <ScrollArea>
        {patientDetails.map((detail) => (
          <Card key={detail.id}>
            <CardHeader>
              <CardTitle>
                {detail.chiefComplaint || "No Chief Complaint"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <ul>
                  <li>Existing Disease: {detail.existingDisease || "N/A"}</li>
                  <li>Signs and Symptoms: {detail.signAndSymptoms || "N/A"}</li>
                  <li>
                    Examination Details: {detail.examinationDetails || "N/A"}
                  </li>
                  <li>Lab Investigation: {detail.labInvestigation || "N/A"}</li>
                  <li>X-rays or MRIs: {detail.xRaysOrMRs || "N/A"}</li>
                  <li>Final Diagnosis: {detail.finalDiagnosis || "N/A"}</li>
                  <li>
                    Treatment Presented: {detail.treatmentPresented || "N/A"}
                  </li>
                  <li>Follow-up: {id || "N/A"}</li>
                  <li>Follow-up: {detail.followUp || "N/A"}</li>
                </ul>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <EditDetails details={detail} userId={id} />
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
