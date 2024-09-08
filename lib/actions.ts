"use server"

import { revalidatePath } from "next/cache";
import { createPatient, deletePatient, updatePatient, deletePatients } from "./patients";
import { createPatientDetail, deletePatientDetail, updatePatientDetail } from "./details";

// Define a type for PatientDetail with dynamicFields
interface PatientDetail {
  chiefComplaint: string;
  existingDisease: string;
  signAndSymptoms: string;
  examinationDetails: string;
  labInvestigation: string;
  xRaysOrMRs: string;
  finalDiagnosis: string;
  treatmentPresented: string;
  followUp: string;
  dynamicFields?: Array<{ label: string; value: string }>; // Added dynamicFields
}

// Create Patient Action
export async function createPatientAction(
  name: string,
  age: string,
  sex: string,
  contact: string
) {
  await createPatient(name, age, sex, contact);
  revalidatePath('/patients');
}

// Delete Patient Action
export async function deletePatientAction(id: string) {
  await deletePatient(id);
  revalidatePath('/patients');
}

// Update Patient Action
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

// Delete Multiple Patients Action
export async function deletePatientsAction(ids: string[]) {
  await deletePatients(ids);
  revalidatePath('/patients');
}

// Create Patient Detail Action
export async function createPatientDetailAction(
  details: PatientDetail,
  userId: string
) {
  await createPatientDetail(details, userId);
  revalidatePath(`/patients/${userId}`);
}

// Delete Patient Detail Action
export async function deletePatientDetailAction(id: string, userId: string) {
  await deletePatientDetail(id);
  revalidatePath(`/patients/${userId}`);
}

// Update Patient Detail Action
export async function updatePatientDetailAction(
  id: string,
  details: PatientDetail,
  userId: string
) {
  await updatePatientDetail(id, details);
  revalidatePath(`/patients/${userId}`);
}
