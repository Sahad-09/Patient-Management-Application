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

export async function getPatient(id: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: { Details: true },
    });

    if (!patient) {
      return { patient: null }; // Return null if the patient is not found
    }

    // Convert null Details to undefined
    const normalizedPatient = {
      ...patient,
      Details: patient.Details ?? undefined,
    };

    return { patient: normalizedPatient };
  } catch (error) {
    console.error('Error fetching patient:', error);
    return { patient: null }; // Return null in case of an error
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

export async function deletePatients(ids: string[]) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete Details associated with the Patients
      await prisma.details.deleteMany({
        where: {
          userId: { in: ids }
        }
      });

      // Delete the Patients
      const patients = await prisma.patient.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      return { patients };
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
