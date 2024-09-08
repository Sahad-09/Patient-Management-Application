import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Generate and insert dummy data for 15 Patients
  const patientData = Array.from({ length: 15 }).map(() => ({
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 1, max: 100 }).toString(),
    sex: faker.name.sex(),
    contact: faker.phone.number(),
  }));

  const patients = await prisma.patient.createMany({
    data: patientData,
  });

  console.log('15 Patients inserted successfully!');

  // Fetch the inserted patients to create corresponding Details
  const insertedPatients = await prisma.patient.findMany();

  // Generate and insert dummy data for Details related to each patient
  const detailsData = insertedPatients.map((patient) => ({
    chiefComplaint: faker.lorem.sentence(),
    existingDisease: faker.lorem.word(),
    signAndSymptoms: faker.lorem.sentence(),
    examinationDetails: faker.lorem.sentence(),
    labInvestigation: faker.lorem.sentence(),
    xRaysOrMRs: faker.lorem.sentence(),
    finalDiagnosis: faker.lorem.sentence(),
    treatmentPresented: faker.lorem.sentence(),
    followUp: faker.lorem.sentence(),
    patient: {
      connect: { id: patient.id }, // Link the Details to the existing Patient by ID
    },
  }));

  // Insert details for each patient
  for (const details of detailsData) {
    await prisma.details.create({
      data: details,
    });
  }

  console.log('Details for 15 patients inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
