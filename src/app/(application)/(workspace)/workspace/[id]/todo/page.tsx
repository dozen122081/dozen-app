"use client"
import { getIdFromUrl } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import WorkspaceTodoBoard from './_components/WorkspaceTodoBoard';

const page = () => {
  const [fullUrl, setFullUrl] = useState('');
  const {user} = useUser();
  
  useEffect(() => {
    // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
    const url = window.location.href;
    setFullUrl(url);
  }, [])
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