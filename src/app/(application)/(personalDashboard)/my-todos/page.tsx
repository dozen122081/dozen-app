"use client"
import { fetchUserData } from '@/lib/backend-actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import RequestCategoryAdd from './_components/RequestCategoryAdd';
import { TodoBoard } from './_components/TodoBoard';

type UserData = {
  id: string;
  objectId: string; // Assuming _id is a string
  username: string;
  image: string;
  name: string;
  email: string,
}
const Page = () => {
  const {user} = useUser();
  const [userData, setUserData] = useState<UserData | null>(null); // Explicitly define the type of state

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return null;

      const userInfo = await fetchUserData(user.id);
      if (!userInfo?.onboarded) {
        redirect("/onboarding");
        return;
      }

      const userMail = (user?.emailAddresses[0]).toString();
      setUserData({
        id: user.id,
        objectId: userInfo._id || "",
        username: userInfo.username || user.username || "",
        name: userInfo.name || user.firstName || "",
        image: userInfo.image || user.imageUrl,
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
        <TodoBoard userId={userData.objectId.toString()} />
      </div>
    </div>
  );
};

export default Page;
