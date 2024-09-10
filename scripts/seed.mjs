import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          emailVerified: faker.date.past(),
          image: faker.image.avatar(),
        },
      })
    )
  );

  // Create sample patients with details
  const patients = await Promise.all(
    users.map((user) =>
      prisma.patient.create({
        data: {
          name: faker.person.fullName(),
          age: faker.number.int({ min: 0, max: 100 }).toString(),
          sex: faker.person.gender(),
          contact: faker.phone.number(),
          dateTime: faker.date.past(),
          userId: user.id,
          Details: {
            create: {
              chiefComplaint: faker.lorem.sentence(),
              existingDisease: faker.lorem.sentence(),
              signAndSymptoms: faker.lorem.sentence(),
              examinationDetails: faker.lorem.sentence(),
              labInvestigation: faker.lorem.sentence(),
              xRaysOrMRs: faker.lorem.sentence(),
              finalDiagnosis: faker.lorem.sentence(),
              treatmentPresented: faker.lorem.sentence(),
              followUp: faker.lorem.sentence(),
              dynamicFields: {
                sampleField: faker.lorem.sentence(),
              },
              userId: user.id,
            },
          },
        },
      })
    )
  );

  // Create sample accounts
  await Promise.all(
    users.map((user) =>
      prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: 'google',
          providerAccountId: faker.string.uuid(),
          refresh_token: faker.lorem.words(),
          access_token: faker.lorem.words(),
          expires_at: faker.number.int(),
          token_type: 'Bearer',
          scope: 'email profile',
          id_token: faker.lorem.words(),
          session_state: 'active',
        },
      })
    )
  );

  // Create sample sessions
  await Promise.all(
    users.map((user) =>
      prisma.session.create({
        data: {
          sessionToken: faker.string.uuid(),
          userId: user.id,
          expires: faker.date.future(),
        },
      })
    )
  );

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
