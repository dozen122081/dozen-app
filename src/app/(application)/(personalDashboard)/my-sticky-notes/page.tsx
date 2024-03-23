import { fetchUserData } from '@/lib/backend-actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import StickyNotes from './_components/StickyNotes'

const page = async () => {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUserData(user.id)
    if (!userInfo?.onboarded) redirect("/onboarding")
    return (
        <main className='px-5 py-10 w-full'>
            <div>
                <h1 className="text-3xl font-bold">All of your flash notes</h1>
            </div>
            <div className='w-full lg:max-w-[90vw]'>
                <StickyNotes userId={userInfo._id.toString()} />
            </div>
        </main>
    )
}

export default page