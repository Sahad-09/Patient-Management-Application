// import prisma from './prismadb'

// export async function getPatients() {
//   try {
//     const patients = await prisma.patient.findMany({
//       include: {
//         Details: true,
//       },
//     });

//     // Convert null Details to undefined
//     const normalizedPatients = patients.map((patient) => ({
//       ...patient,
//       Details: patient.Details ?? undefined,
//     }));

//     return { patients: normalizedPatients };
//   } catch (error) {
//     return { patients: [] }; // Return an empty array in case of an error
//   }
// }

// export async function getPatient(id: string) {
//   try {
//     const patient = await prisma.patient.findUnique({
//       where: { id },
//       include: { Details: true },
//     });

//     if (!patient) {
//       return { patient: null }; // Return null if the patient is not found
//     }

//     // Convert null Details to undefined
//     const normalizedPatient = {
//       ...patient,
//       Details: patient.Details ?? undefined,
//     };

//     return { patient: normalizedPatient };
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     return { patient: null }; // Return null in case of an error
//   }
// }




// export async function createPatient(
//   name: string,
//   age: string,
//   sex: string,
//   contact: string
// ) {
//   try {
//     const patient = await prisma.patient.create({
//       data: {
//         name,
//         age,
//         sex,
//         contact,
//       }
//     });
//     return { patient };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function deletePatient(id: string) {
//   try {
//     await prisma.$transaction(async (prisma) => {
//       // Delete Details associated with the Patient
//       await prisma.details.deleteMany({
//         where: {
//           userId: id
//         }
//       });

//       // Delete the Patient
//       const patient = await prisma.patient.delete({
//         where: { id },
//       });
//       return { patient };
//     });
//   } catch (error) {
//     return { error };
//   }
// }

// export async function deletePatients(ids: string[]) {
//   try {
//     await prisma.$transaction(async (prisma) => {
//       // Delete Details associated with the Patients
//       await prisma.details.deleteMany({
//         where: {
//           userId: { in: ids }
//         }
//       });

//       // Delete the Patients
//       const patients = await prisma.patient.deleteMany({
//         where: {
//           id: { in: ids },
//         },
//       });
//       return { patients };
//     });
//   } catch (error) {
//     return { error };
//   }
// }


// export async function updatePatient(
//   id: string,
//   name: string,
//   age: string,
//   sex: string,
//   contact: string
// ) {
//   try {
//     const patient = await prisma.patient.update({
//       where: { id },
//       data: {
//         name,
//         age,
//         sex,
//         contact,
//       },
//     });
//     return { patient };
//   } catch (error) {
//     return { error };
//   }
// }

import prisma from './prismadb';

// Fetch all patients with their details
export async function getPatients() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        Details: true,
      },
    });

    // Normalize Details
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

// Fetch a single patient by ID with details
export async function getPatient(id: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: { Details: true },
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
  contact: string
) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        sex,
        contact,
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

