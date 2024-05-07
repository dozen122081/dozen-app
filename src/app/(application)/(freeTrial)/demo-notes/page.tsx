"use client"
import { useUser } from '@clerk/nextjs';
import Notes from './_components/Notes/Notes';
const Page = () => {
  const { user } =  useUser();

  if(!user) return null;
  return (
    <main className='px-5 py-10 w-full'>
      <div>
        <h1 className="text-3xl font-bold">All of your flash notes</h1>
      </div>
      <div className='w-full'>
        <Notes userId={user.id} />
      </div>
    </main>
  );
};

export default Page;
