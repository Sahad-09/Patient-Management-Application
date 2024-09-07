import React from "react";
import { getPatientDetails } from "@/lib/details";
import EditDetails from "@/components/DetailsComponents/EditDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { patientDetails } = await getPatientDetails(params.id);
  console.log("Patietendbddb ", patientDetails);

  if (!patientDetails) {
    return (
      <div className="text-center text-xl text-red-600">Patient not found</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Patient Information
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Patient ID: {params.id}
          </h2>
          <p className="text-md text-gray-600">Name: {patientDetails.name}</p>
          <p className="text-md text-gray-600">Age: {patientDetails.age}</p>
          <p className="text-md text-gray-600">Sex: {patientDetails.sex}</p>
          <p className="text-md text-gray-600">
            Contact: {patientDetails.contact}
          </p>
        </div>

        {patientDetails.Details ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Patient Details
            </h3>
            <p className="text-md text-gray-600">
              Chief Complaint: {patientDetails.Details.chiefComplaint}
            </p>
            <p className="text-md text-gray-600">
              Existing Disease: {patientDetails.Details.existingDisease}
            </p>
            <p className="text-md text-gray-600">
              Sign and Symptoms: {patientDetails.Details.signAndSymptoms}
            </p>
            <p className="text-md text-gray-600">
              Examination Details: {patientDetails.Details.examinationDetails}
            </p>
            <p className="text-md text-gray-600">
              Lab Investigation: {patientDetails.Details.labInvestigation}
            </p>
            <p className="text-md text-gray-600">
              X-rays or MRIs: {patientDetails.Details.xRaysOrMRs}
            </p>
            <p className="text-md text-gray-600">
              Final Diagnosis: {patientDetails.Details.finalDiagnosis}
            </p>
            <p className="text-md text-gray-600">
              Treatment Presented: {patientDetails.Details.treatmentPresented}
            </p>
            <p className="text-md text-gray-600">
              Follow Up: {patientDetails.Details.followUp}
            </p>

            {/* Edit Details Component with userId */}
            <EditDetails details={patientDetails.Details} userId={params.id} />
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold text-gray-700">
              No Details Available
            </h3>
            <p className="text-md text-gray-600">
              No additional details are available for this patient.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
