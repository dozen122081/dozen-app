"use client"
import { getIdFromUrl } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Notes from './_components/Notes/Note';
const Page = () => {
    const [fullUrl, setFullUrl] = useState('');
    const { user } = useUser();

    useEffect(() => {
        // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
        const url = window.location.href;
        setFullUrl(url);
    }, [])
    if (!fullUrl) return;
    const workspaceId = getIdFromUrl(fullUrl);
    if (!workspaceId) return;
    if (!user) return;
    return (
        <main className='px-5 py-10 w-full'>
            <div>
                <h1 className="text-3xl font-bold">This is your personal workspace focus clock</h1>
            </div>
            <div className='w-full lg:max-w-[90vw]'>
                <Notes userId={user.id} workspaceId={workspaceId} />
            </div>
        </main>
    );
};

export default Page;