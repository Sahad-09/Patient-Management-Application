import prisma from './prismadb';

// Fetch all patients with their details for a specific user
export async function getPatients(userId: string) {
  try {
    const patients = await prisma.patient.findMany({
      where: { userId },
      include: {
        Details: true,
        user: {  // Changed to uppercase 'User'
          select: {
            email: true,
            image: true,
          },
        },
      },
    });

    const normalizedPatients = patients.map((patient) => ({
      ...patient,
      Details: patient.Details ?? undefined,
    }));

    return { patients: normalizedPatients };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return { patients: [], error };
  }
}

// Fetch a single patient by ID with details, ensuring it belongs to the current user
export async function getPatient(id: string, userId: string) {
  try {
    const patient = await prisma.patient.findFirst({
      where: { 
        id,
        userId 
      },
      include: { 
        Details: true,
        user: {
          select: {
            email: true,
            image: true,
          },
        },
      },
    });

    if (!patient) {
      return { patient: null, error: 'Patient not found' };
    }

    // Normalize Details
    const normalizedPatient = {
      ...patient,
      Details: patient.Details ?? undefined,
    };

    return { patient: normalizedPatient };
  } catch (error) {
    console.error('Error fetching patient:', error);
    return { patient: null, error };
  }
}

// Create a new patient
export async function createPatient(
  name: string,
  age: string,
  sex: string,
  contact: string,
  userId: string
) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        sex,
        contact,
        userId,
      },
    });
    return { patient };
  } catch (error) {
    console.error('Error creating patient:', error);
    return { error };
  }
}

// Delete a single patient and their associated details
export async function deletePatient(id: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete the details first
      await prisma.details.deleteMany({
        where: {
          userId: id,
        },
      });

      // Then delete the patient
      const patient = await prisma.patient.delete({
        where: { id },
      });

      return { patient };
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return { error };
  }
}

// Delete multiple patients and their associated details
export async function deletePatients(ids: string[]) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete the details for all patients
      await prisma.details.deleteMany({
        where: {
          userId: { in: ids },
        },
      });

      // Then delete the patients
      const patients = await prisma.patient.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return { patients };
    });
  } catch (error) {
    console.error('Error deleting patients:', error);
    return { error };
  }
}

// Update patient details
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
    console.error('Error updating patient:', error);
    return { error };
  }
}

// Verify if a patient belongs to a user
export async function verifyPatientOwnership(patientId: string, userId: string) {
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        userId: userId
      }
    });
    return !!patient;
  } catch (error) {
    console.error('Error verifying patient ownership:', error);
    return false;
  }
}