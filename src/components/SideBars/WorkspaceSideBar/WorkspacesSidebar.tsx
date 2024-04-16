import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Link } from 'next-view-transitions'
import React from 'react'
import { BiDoorOpen } from 'react-icons/bi';
const WorkspacesSidebar = () => {
    return (
        <nav className="flex justify-between items-center border-b bg-white">
            <div>
                <Link
                    href="/personal-dashboard"
                    className={cn(
                        "py-3 font-semibold rounded-md flex gap-1 items-center",
                    )}
                >
                    <BiDoorOpen className='h-4 w-4' />
                    <span className='text-sm'> Back to home</span>
                </Link>
            </div>
            <div>
                <UserButton />
            </div>
        </nav>
    )
}

export default WorkspacesSidebar