"use client"
import { useEffect, useState } from 'react';
import { currentUser, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import StickyNotes from './_components/StickyNotes';
import { fetchUserData } from '@/lib/backend-actions/user.actions';

type UserInfo = {
    id: string;
}
const Page = () => {
  // const [userInfo, setUserInfo] = useState<UserInfo | null >(null);
  const { user } =  useUser();

  // const fetchData = async () => {
  //   if (!user) return null;

  //   const response = await fetch('/api/user');
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch user data');
  //   }
  //   const data = await response.json();
  //   const userData = await fetchUserData(user.id);
  //   if (!data?.onboarded) {
  //     redirect("/onboarding");
  //   }
  //   setUserInfo(data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [user]);

  // if (!userInfo) return null;
  if(!user) return null;
  return (
    <main className='px-5 py-10 w-full'>
      <div>
        <h1 className="text-3xl font-bold">All of your flash notes</h1>
      </div>
      <div className='w-full lg:max-w-[90vw]'>
        <StickyNotes userId={user.id} />
      </div>
    </main>
  );
};

export default Page;
