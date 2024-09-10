"use server"

import { revalidatePath } from "next/cache";
import { createPatient, deletePatient, updatePatient, deletePatients, getPatients, verifyPatientOwnership } from "./patients";
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
  dynamicFields?: Array<{ label: string; value: string }>;
}

// Create Patient Action
export async function createPatientAction(
  name: string,
  age: string,
  sex: string,
  contact: string,
  userId: string
) {
  await createPatient(name, age, sex, contact, userId);
  revalidatePath('/patients');
}

// Delete Patient Action
export async function deletePatientAction(id: string, userId: string) {
  const isOwner = await verifyPatientOwnership(id, userId);
  if (!isOwner) {
    throw new Error("You don't have permission to delete this patient");
  }
  await deletePatient(id);
  revalidatePath('/patients');
}

// Update Patient Action
export async function updatePatientAction(
  id: string,
  name: string,
  age: string,
  sex: string,
  contact: string,
  userId: string
) {
  const isOwner = await verifyPatientOwnership(id, userId);
  if (!isOwner) {
    throw new Error("You don't have permission to update this patient");
  }
  await updatePatient(id, name, age, sex, contact);
  revalidatePath('/patients');
}

// Delete Multiple Patients Action
export async function deletePatientsAction(ids: string[], userId: string) {
  const ownedPatients = await Promise.all(ids.map(id => verifyPatientOwnership(id, userId)));
  if (ownedPatients.some(owned => !owned)) {
    throw new Error("You don't have permission to delete one or more of these patients");
  }
  await deletePatients(ids);
  revalidatePath('/patients');
}

// Get Patients Action
export async function getPatientsAction(userId: string) {
  return await getPatients(userId);
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
  const isOwner = await verifyPatientOwnership(id, userId);
  if (!isOwner) {
    throw new Error("You don't have permission to delete this patient's details");
  }
  await deletePatientDetail(id);
  revalidatePath(`/patients/${userId}`);
}

// Update Patient Detail Action
export async function updatePatientDetailAction(
  id: string,
  details: PatientDetail,
  userId: string
) {
  const isOwner = await verifyPatientOwnership(id, userId);
  if (!isOwner) {
    throw new Error("You don't have permission to update this patient's details");
  }
  await updatePatientDetail(id, details);
  revalidatePath(`/patients/${userId}`);
}