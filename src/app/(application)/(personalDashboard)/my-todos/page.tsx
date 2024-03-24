"use client"
import { fetchUserData } from '@/lib/backend-actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import RequestCategoryAdd from './_components/RequestCategoryAdd';
import { TodoBoard } from './_components/TodoBoard';
import useSWR from 'swr'

type UserData = {
  id: string;
  objectId: string; // Assuming _id is a string
  username: string;
  image: string;
  name: string;
  email: string,
}
const Page = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null); // Explicitly define the type of state
  const { data: userDataFromAPI, error, isLoading } = useSWR('/api/user', fetch)
  useEffect(() => {


    const fetchData = async () => {
      if (!user) return null;
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log(data)
      const userInfo = await fetchUserData(data.id);
      if (!data?.onboarded) {
        redirect("/onboarding");
        return;
      }

      const userMail = (user?.emailAddresses[0]).toString();
      setUserData({
        id: data.id,
        objectId: data._id || "",
        username: data.username || user.username || "",
        name: data.name || user.firstName || "",
        image: data.image || user.imageUrl,
        email: userMail || "",
      });
    };

    fetchData();
  }, []);

  if (!userData) return null;

  return (
    <div className='w-full py-10 px-5 flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold">{userData.name}'s Task Status</h1>
        <div>
          <RequestCategoryAdd user={userData} />
        </div>
      </div>
      <div className='w-full lg:max-w-[90vw]'>
        <TodoBoard userId={userData.id.toString()} />
      </div>
    </div>
  );
};

export default Page;
