import prisma from './prismadb'

export async function getPatients() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        Details: true,
      },
    });

    // Convert null Details to undefined
    const normalizedPatients = patients.map((patient) => ({
      ...patient,
      Details: patient.Details ?? undefined,
    }));

    return { patients: normalizedPatients };
  } catch (error) {
    return { patients: [] }; // Return an empty array in case of an error
  }
}




export async function createPatient(
  name: string,
  age: string,
  sex: string,
  contact: string
) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        sex,
        contact,
      }
    });
    return { patient };
  } catch (error) {
    return { error };
  }
}

export async function deletePatient(id: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete Details associated with the Patient
      await prisma.details.deleteMany({
        where: {
          userId: id
        }
      });

      // Delete the Patient
      const patient = await prisma.patient.delete({
        where: { id },
      });
      return { patient };
    });
  } catch (error) {
    return { error };
  }
}

export async function updatePatient(
  id: string,
  name: string,
  age: string,
  sex: string,
  contact: string
) {
  try {
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        age,
        sex,
        contact,
      },
    });
    return { patient };
  } catch (error) {
    return { error };
  }
}
