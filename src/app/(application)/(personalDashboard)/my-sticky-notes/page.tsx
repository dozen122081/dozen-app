"use client"
import { useEffect, useState } from 'react';
import { currentUser, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import StickyNotes from './_components/StickyNotes';
import { fetchUserData } from '@/lib/backend-actions/user.actions';

type UserInfo = {
    _id: string;
}
const Page = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null >(null);
  const { user } =  useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return null;

      const userData = await fetchUserData(user.id);
      if (!userData?.onboarded) {
        redirect("/onboarding");
        return;
      }

      setUserInfo(userData);
    };

    fetchData();
  }, []);

  if (!userInfo) return null;

  return (
    <main className='px-5 py-10 w-full'>
      <div>
        <h1 className="text-3xl font-bold">All of your flash notes</h1>
      </div>
      <div className='w-full lg:max-w-[90vw]'>
        <StickyNotes userId={userInfo._id.toString()} />
      </div>
    </main>
  );
};

export default Page;
