import { fetchUserData } from '@/lib/backend-actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { TodoBoard } from './_components/TodoBoard'
import { Button } from '@/components/ui/button';
import { sendEmail } from '@/lib/sendmail';
import { toast } from 'sonner';
import RequestCategoryAdd from './_components/RequestCategoryAdd';
// Send feature request mail
const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserData(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const userDataFromDb = await fetchUserData(user.id)
  console.log(userDataFromDb)
  if (!userDataFromDb?.onboarded) return redirect("/onboarding");
  const userMail = (user?.emailAddresses[0]).toString()
  const userData = {
    id: user.id,
    objectId: userDataFromDb?._id,
    username: userDataFromDb ? userDataFromDb.username : user.username || "",
    name: userDataFromDb ? userDataFromDb.name : user.firstName || "",
    image: userDataFromDb ? userDataFromDb.image : user.imageUrl,
    email: userMail
  }

  return (
    <div className='w-full py-10 px-5 flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold">{userInfo.name}'s Task Status</h1>

        <div>
          <RequestCategoryAdd
            user={userData}
          />
          
        </div>


      </div>
      <div className='w-full lg:max-w-[90vw]'>
        <TodoBoard
          userId={userInfo._id.toString()}
        />
      </div>
    </div>
  )
}

export default page