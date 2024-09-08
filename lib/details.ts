import prisma from './prismadb'

export async function getPatientDetails(id: string) {
  try {
    const patientDetails = await prisma.details.findMany({
      where: { userId: id },
    });

    return { patientDetails };
  } catch (error) {
    return { error };
  }
}

export async function createPatientDetail(
  details: {
    chiefComplaint: string,
    existingDisease: string,
    signAndSymptoms: string,
    examinationDetails: string,
    labInvestigation: string,
    xRaysOrMRs: string,
    finalDiagnosis: string,
    treatmentPresented: string,
    followUp: string,
  },
  userId: string
) {
  try {
    const detail = await prisma.details.create({
      data: {
        ...details,
        userId,
      },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
}

export async function deletePatientDetail(id: string) {
  try {
    const detail = await prisma.details.delete({
      where: { id },
    });
    return { detail };
  } catch (error) {
    return { error };
  }
}

export async function updatePatientDetail(
  id: string,
  details: {
    chiefComplaint: string,
    existingDisease: string,
    signAndSymptoms: string,
    examinationDetails: string,
    labInvestigation: string,
    xRaysOrMRs: string,
    finalDiagnosis: string,
    treatmentPresented: string,
    followUp: string,
  }
) {
  try {
    const updatedDetail = await prisma.details.update({
      where: { id },
      data: {
        ...details,
      },
    });
    return { updatedDetail };
  } catch (error) {
    return { error };
  }
}
