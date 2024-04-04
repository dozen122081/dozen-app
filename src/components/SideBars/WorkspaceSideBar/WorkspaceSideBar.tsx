"use client"
import { cn } from '@/lib/utils';
import { AlignStartVertical, Blocks, Boxes, StickyNote } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiDoorOpen } from "react-icons/bi";
function getIdFromUrl(url: string): string | null {
  const regex = /\/workspace\/([a-f0-9]+)/; // Added closing delimiter /
  const match = url.match(regex);
  return match ? match[1] : null;
}

const WorkspaceSideBar = () => {
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
    const url = window.location.href;
    setFullUrl(url);
  }, [])
  if (!fullUrl) return null;
  const workspaceId = getIdFromUrl(fullUrl);
  if (!workspaceId) return null;
  const isTodoActive = (pathname.includes(`/workspace/${workspaceId}/todo`)) || pathname === `/workspace/${workspaceId}/todo`
  const isStickyNotesActive = (pathname.includes(`/workspace/${workspaceId}/stickynotes`)) || pathname === `/workspace/${workspaceId}/stickynotes`
  return (
    <aside className='w-full max-w-[10rem]'>
      <div>
        <Link
          href="/personal-dashboard"
          className={cn(
            "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
          )}
        >
          <BiDoorOpen className='h-4 w-4' />
          <span className='text-sm'> Back to home</span>
        </Link>
        <Link
          href="/workspace"
          className={cn(
            "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
          )}
        >
          <Boxes className='h-4 w-4' />
          <span className='text-sm'>My Spaces</span>
        </Link>
      </div>
      <div>
        <div className='flex flex-col gap-2 text-sm'>
          <Link
            href={`/workspace/${workspaceId}/todo`}
            className={cn(
              "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
              isTodoActive && "bg-secondary text-md"
            )}
          >
            <AlignStartVertical className='h-4 w-4' />

            <span className='text-sm'>Todo</span>
          </Link>
          <Link
            href={`/workspace/${workspaceId}/stickynotes`}
            className={cn(
              "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
              isStickyNotesActive && "bg-secondary text-md"
            )}
          >
            <StickyNote className='h-4 w-4' />
            <span className='text-sm'>Sticky Notes</span>

          </Link>
        </div>
      </div>
    </aside >
  )
}

export default WorkspaceSideBar