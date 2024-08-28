import axios from 'axios';
import { Button } from '@/components/ui/button';

async function getPatients() {
  const endpoint = `${process.env.NEXT_PUBLIC_URL}/api/patients`;
  
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    console.log(response);
    
    return response.data; // axios automatically parses JSON responses
  } catch (error) {
    console.error("Error fetching patients:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

export default async function Patients() {
  const patients = await getPatients();
  console.log("Patients: ", patients);
  
  return (
    <section className='mt-16'>
      <h3 className='font-serif text-xl'>Patients</h3>
      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {patients.map((patient: any) => (
          <div key={patient.id} className='rounded bg-white p-4 shadow'>
            <h3 className='font-semibold text-black'>{patient.name}</h3>
            <p className='text-sm text-gray-500'>{patient.contact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
