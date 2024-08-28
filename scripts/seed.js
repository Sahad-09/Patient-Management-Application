// scripts/seed.js

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Generate dummy data for Patients
  const patientData = Array.from({ length: 10 }).map(() => ({
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 1, max: 100 }).toString(),
    sex: faker.name.sex(),
    contact: faker.phone.number(),
  }));

  // Insert dummy data into the database
  await prisma.patient.createMany({
    data: patientData,
  });

  console.log('Dummy data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
