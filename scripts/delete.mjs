import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch 5 random patients from the database
  const patients = await prisma.patient.findMany({
    take: 5, // limit to 5 patients
    orderBy: {
      id: 'asc', // Assuming you have an 'id' field and want to delete in ascending order
    },
  });

  // Delete related details and then patients
  for (const patient of patients) {
    // Delete related Details records
    await prisma.details.deleteMany({
      where: {
        patient: {
          id: patient.id,
        },
      },
    });

    // Delete the patient record
    await prisma.patient.delete({
      where: { id: patient.id },
    });
  }

  console.log('5 random patients and their related details deleted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
