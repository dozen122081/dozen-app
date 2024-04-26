import UserProfileForm from '@/components/forms/UserProfileForm';
import { fetchUserData } from '@/lib/backend-actions/user.actions';
import MaxWidthWrapper from '@/lib/MaxWidthWrapper';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  // get user data from db 
  const userDataFromDb = await fetchUserData(user.id)
  console.log(userDataFromDb)
  
  const userData = {
    id: user.id,
    objectId: userDataFromDb?._id,
    username: userDataFromDb ? userDataFromDb.username : user.username,
    email: user.emailAddresses[0].emailAddress,
    name: userDataFromDb ? userDataFromDb.name : user.firstName,
    onboarded: userDataFromDb ? userDataFromDb.onboarded : false,
    image: userDataFromDb ? userDataFromDb.image : user.imageUrl,
    hasPaid: userDataFromDb ? userDataFromDb.hasPaid : false,
    hasPaidWorkspace: userDataFromDb ? userDataFromDb.hasPaidWorkspace : false,
  }
  if(userDataFromDb?.onboarded) return redirect("/personal-dashboard");
  return (
    <section className='w-full min-h-screen py-3 md:py-10'>
      <MaxWidthWrapper className='flex flex-col gap-10 md:gap-20 items-start p-6 w-full'>
        <header>
          <h2 className='font-medium text-xl md:text-5xl'>Let's get you started</h2>
        </header>
        <main className='flex flex-col items-center w-full'>
          <UserProfileForm
            user={userData}
            btnTitle="Create"
          />
        </main>
      </MaxWidthWrapper>
    </section>
  )
}

export default page