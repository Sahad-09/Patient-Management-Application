import React from 'react';
import UserList from '../components/PatientList';


async function getPatients() {
  const endpoint = `${process.env.NEXT_PUBLIC_URL}/api/patients`;
  const response = await fetch(endpoint, { next: { tags: ['patients'] } });
  console.log(response);
  
  return response.json();
}

export default async function Home() {
  const patients = await getPatients();
  console.log("PAtients, " + patients);
  

  return (
    <section className='mt-16'>
      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {patients.map((patient: any) => (
          <UserList key={patient.id} patient={patient} />
        ))}
      </div>
    </section>
  );
}
