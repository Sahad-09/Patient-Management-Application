// scripts/delete.js

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

  // Delete the fetched patients
  for (const patient of patients) {
    await prisma.patient.delete({
      where: { id: patient.id },
    });
  }

  console.log('5 random patients deleted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
