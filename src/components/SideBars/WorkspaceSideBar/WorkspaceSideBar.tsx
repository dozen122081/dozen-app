"use client"
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlignStartVertical, Blocks, Box, Boxes, ClipboardList, Coffee, StickyNote } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiDoorOpen } from "react-icons/bi";
function getIdFromUrl(url: string): string | null {
  const regex = /\/workspace\/([a-f0-9]+)/; // Added closing delimiter /
  const match = url.match(regex);
  return match ? match[1] : null;
}
const Personal_Workspace_Sidebar_Links = [
  {
    id: 0,
    title: "Todo",
    href: "todo",
    icon: <AlignStartVertical className='h-4 w-4' />,
  },
  {
    id: 1,
    title: "Today",
    href: "today",
    icon: <Coffee className='h-4 w-4' />,
  },
  {
    id: 2,
    title: "Tomorrow",
    href: "tomorrow",
    icon: <ClipboardList className='h-4 w-4' />,
  },
  {
    id: 3,
    title: "Sticky Notes",
    href: "stickynotes",
    icon: <StickyNote className='h-4 w-4' />,
  },
]
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
  const pathSegments = pathname.split('/')
  const isDashboardActive = pathSegments.length === 3
  return (
    <aside className='w-full flex flex-col gap-2 max-w-[10rem]'>
      <div>
        <Link
          href="/personal-dashboard"
          className={cn(
            "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
          )}
        >
          <BiDoorOpen className='h-4 w-4' />
          <span className='text-sm'>Back to home</span>
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
      <Separator className='bg-border'/>
      <div>
        <div className='flex flex-col gap-2 text-sm'>
          <Link
            href={`/workspace/${workspaceId}`}
            className={cn(
              "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
              isDashboardActive && "bg-secondary text-md"
            )}
          >
            <Box className='h-4 w-4'/>
            <span className='text-sm'>Dashboard</span>
          </Link>
          {
            Personal_Workspace_Sidebar_Links.map((linkItem) => {
              const isActive = (pathname.includes(`${linkItem.href}`)) || pathname === `/workspace/${workspaceId}/${linkItem.href}`
              return (
                <Link
                  key={linkItem.id}
                  href={`/workspace/${workspaceId}/${linkItem.href}`}
                  className={cn(
                    "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
                    isActive && "bg-secondary text-md"
                  )}
                >
                  {linkItem.icon}
                  <span className='text-sm'>{linkItem.title}</span>
                </Link>
              )
            })
          }
        </div>
      </div>
    </aside >
  )
}

export default WorkspaceSideBar