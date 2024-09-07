import prisma from './prismadb'


// export async function getPatientDetails(id: string) {
//   try {
//     const patientDetails = await prisma.patient.findUnique({
//       where: { id },
//       include: { Details: true },  // Include the related Details model
//     });
//     return { patientDetails };
//   } catch (error) {
//     return { error };
//   }
// }


export async function getPatientDetails(id: string) {
  try {
    // Fetch the details directly from the Details model based on the patient ID
    const patientDetails = await prisma.details.findMany({
      where: { userId: id }, // Assuming userId is the foreign key linking Details to Patient
    });

    return { patientDetails };
  } catch (error) {
    return { error };
  }
}


  export async function createPatientDetail(
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
    try {
      const details = await prisma.details.create({
        data: {
          chiefComplaint,
          existingDisease,
          signAndSymptoms,
          examinationDetails,
          labInvestigation,
          xRaysOrMRs,
          finalDiagnosis,
          treatmentPresented,
          followUp,
          userId,
        },
      });
      return { details };
    } catch (error) {
      return { error };
    }
  }
  
  export async function deletePatientDetail(id: string) {
    try {
      const details = await prisma.details.delete({
        where: { id },
      });
      return { details };
    } catch (error) {
      return { error };
    }
  }
  
  export async function updatePatientDetail(
    id: string,
    chiefComplaint: string,
    existingDisease: string,
    signAndSymptoms: string,
    examinationDetails: string,
    labInvestigation: string,
    xRaysOrMRs: string,
    finalDiagnosis: string,
    treatmentPresented: string,
    followUp: string
  ) {
    try {
      const details = await prisma.details.update({
        where: { id },
        data: {
          chiefComplaint,
          existingDisease,
          signAndSymptoms,
          examinationDetails,
          labInvestigation,
          xRaysOrMRs,
          finalDiagnosis,
          treatmentPresented,
          followUp,
        },
      });
      return { details };
    } catch (error) {
      return { error };
    }
  }