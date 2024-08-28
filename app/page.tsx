import React from 'react';
import UserList from '../components/UserList';
import { revalidateAll } from '@/lib/actions';
import { Button } from '@/components/ui/button';


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1 className="text-3xl font-bold">Welcome to the User Management App</h1> */}
      <form action={revalidateAll}>
            <Button size='sm' className='mt-3'>
              Revalidate the entire path
            </Button>
          </form>
      <UserList />



    </main>
  );
}