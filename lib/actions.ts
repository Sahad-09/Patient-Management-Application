'use server'

import { revalidatePath } from "next/cache";
import { createPatient, deletePatient, updatePatient } from "./patients";
import { createPatientDetail, deletePatientDetail, updatePatientDetail } from "./details";

export async function createPatientAction(
  name: string, 
  age: string, 
  sex: string, 
  contact: string
) {
  await createPatient(name, age, sex, contact);
  revalidatePath('/patients');
}

export async function deletePatientAction(id: string) {
  await deletePatient(id);
  revalidatePath('/patients');
}


export async function updatePatientAction(
  id: string,
  name: string,
  age: string,
  sex: string,
  contact: string
) {
  await updatePatient(id, name, age, sex, contact);
  revalidatePath('/patients');
}

// Add the following for Details actions:

export async function createPatientDetailAction(
  chiefComplaint: string,
  existingDisease: string,
  signAndSymptoms: string,
  examinationDetails: string,
  labInvestigation: string,
  xRaysOrMRs: string,
  finalDiagnosis: string,
  treatmentPresented: string,
  followUp: string,
  userId: string
) {
  await createPatientDetail(
    chiefComplaint,
    existingDisease,
    signAndSymptoms,
    examinationDetails,
    labInvestigation,
    xRaysOrMRs,
    finalDiagnosis,
    treatmentPresented,
    followUp,
    userId
  );
  revalidatePath(`/patients/${userId}`); // Revalidate after adding patient detail
}

export async function deletePatientDetailAction(id: string, userId: string) {
  await deletePatientDetail(id);
  revalidatePath(`/patients/${userId}`); // Revalidate after deleting patient detail
}

export async function updatePatientDetailAction(
  id: string,
  chiefComplaint: string,
  existingDisease: string,
  signAndSymptoms: string,
  examinationDetails: string,
  labInvestigation: string,
  xRaysOrMRs: string,
  finalDiagnosis: string,
  treatmentPresented: string,
  followUp: string,
  userId: string
) {
  await updatePatientDetail(
    id,
    chiefComplaint,
    existingDisease,
    signAndSymptoms,
    examinationDetails,
    labInvestigation,
    xRaysOrMRs,
    finalDiagnosis,
    treatmentPresented,
    followUp
  );
  revalidatePath(`/patients/${userId}`); // Revalidate after updating patient detail
}