"use client"
import { getIdFromUrl } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import WorkspaceTodoBoard from './_components/WorkspaceTodoBoard';

const page = () => {
  const [fullUrl, setFullUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUser();
  
  useEffect(() => {
    setIsLoading(true)
    // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
    const url = window.location.href;
    setFullUrl(url);
    setIsLoading(false)
  }, [])
  if (isLoading) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        {/* <FaSpinner className='h-7 w-7 animate-spin' /> */}
        <div className='flex flex-col gap-2 items-center'>
          <span className="loading loading-dots loading-lg"></span>
          <span>Loading...</span>
        </div>
      </div>
    )
  }
  if(!fullUrl) return;
  const workspaceId = getIdFromUrl(fullUrl);
  if(!workspaceId) return;
  if(!user) return;
  return (
    <div className='ml-1'>
      <WorkspaceTodoBoard 
        userId={user.id.toString()}
        workspaceId={workspaceId}
      />
    </div>
  )
}

export default page