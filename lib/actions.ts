'use server'

import { revalidatePath } from "next/cache";
import { createPatient } from "./patients";
import { deletePatient } from "./patients";

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

























// import { revalidatePath, revalidateTag } from 'next/cache'
// import { redirect } from 'next/navigation'

// export async function revalidatePatients() {
//   revalidateTag('patients')
//   redirect('/')
// }

// export async function revalidateTodos() {
//   revalidateTag('todos')
//   redirect('/')
// }

// export async function revalidateAll() {
//   revalidatePath('/')
//   redirect('/')
// }
