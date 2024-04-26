"use client"
import { UserData } from '@/app/api/user/route';
import UserProfileForm from '@/components/forms/UserProfileForm';
import { fetchUserData } from '@/lib/backend-actions/user.actions';
import MaxWidthWrapper from '@/lib/MaxWidthWrapper';
import { currentUser, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
export type TUserData = {
  id: string,
  objectId: string,
  username: string,
  email: string,
  name: string,
  onboarded: boolean,
  image: string,
  hasPaid: boolean,
  hasPaidWorkspace: boolean,
}
const page =  () => {
  const { user } = useUser();
  const [userDbData, setUserData] = useState<TUserData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onClient, setOnClient] = useState(false);
  useEffect(() => {setOnClient(true)}, [])
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        // get user data from db 
       if(user){
        const response = await fetch('/api/user');
                            
        const data = await response.json();
        if(data?.message){
            return redirect('/onboarding')
        }
        const userData = {
          id: user.id,
          objectId: data?._id,
          username: data ? data.username : user.username,
          email: user.emailAddresses[0].emailAddress,
          name: data ? data.name : user.firstName,
          onboarded: data ? data.onboarded : false,
          image: data ? data.image : user.imageUrl,
          hasPaid: data ? data.hasPaid : false,
          hasPaidWorkspace: data ? data.hasPaidWorkspace : false,
        }
        setUserData(userData);
       }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);
  if (!user) return null;
  if(userDbData === undefined){
    const userData = {
      id: user.id,
      objectId: "",
      username: user.username || "",
      email: user.emailAddresses[0].emailAddress || "",
      name: user.firstName || "",
      onboarded: false,
      image: user.imageUrl || "",
      hasPaid: false,
      hasPaidWorkspace: false,
    }
    
    return setUserData(userData);
  } 
  if(!onClient) return null;
  if (userDbData?.onboarded) return redirect("/personal-dashboard");
  return (
    <section className='w-full min-h-screen py-3 md:py-10'>
      <MaxWidthWrapper className='flex flex-col gap-10 md:gap-20 items-start p-6 w-full'>
        <header>
          <h2 className='font-medium text-xl md:text-5xl'>Let's get you started</h2>
        </header>
        <main className='flex flex-col items-center w-full'>
          <UserProfileForm
            user={userDbData}
            btnTitle="Create"
          />
        </main>
      </MaxWidthWrapper>
    </section>
  )
}

export default page