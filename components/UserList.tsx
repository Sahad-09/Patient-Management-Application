import { revalidatePatients } from '@/lib/actions';
import { Button } from '@/components/ui/button';

async function getPatients() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/patients/`;
  const response = await fetch(endpoint, { next: { tags: ['patients'] } });
  return response.json();
}

export default async function Patients() {
  const patients = await getPatients();

  return (
    <section className='mt-16'>
      {/* <form
        action={revalidatePatients}
        className='flex items-center justify-between'
      > */}
        <h3 className='font-serif text-xl'>Patients</h3>
        <Button formAction={revalidatePatients} size='sm'>Revalidate Tag</Button>
      {/* </form> */}
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
