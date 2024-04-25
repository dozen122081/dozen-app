"use client"
import { UserData } from '@/app/api/user/route';
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Blocks, Boxes, DraftingCompass, Group, Hammer, Shrink } from 'lucide-react';
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react';
import { IoSettings } from "react-icons/io5";
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from '../ui/skeleton';
const NavBar = () => {
  const { user } = useUser()
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);
  if (!user) return null;
  if (isLoading) {
    return (
      <nav className='h-14 w-full px-4 py-2 border-b-2 flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-8 w-8 rounded-full  bg-neutral-100' />
            <Skeleton className='h-8 w-8 rounded-full  bg-neutral-100' />
            <Skeleton className='h-8 w-8 rounded-full  bg-neutral-100' />
          </div>
          <Skeleton className='h-8 w-8 rounded-full  bg-neutral-100' />
        </div>
      </nav>
    )
  }
  return (
    <>
      <nav className='hidden border-b-2 md:flex items-center justify-between px-4 py-2'>
        <div>
          <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>
        <div className='flex items-center gap-7 font-medium text-sm'>
          <div className='flex gap-4 items-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/features" className='hover:underline transition-all duration-300'>
                    <DraftingCompass className='h-5 w-5' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={25}>
                  <p>Feature Board</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/workspace" className='hover:underline transition-all duration-300'>
                    <Blocks className='h-5 w-5' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={25}>
                  <p>Workspace</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/settings" className='hover:underline transition-all duration-300'>
                    <IoSettings className='h-5 w-5' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={25}>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <UserButton afterSignOutUrl='/onboarding'/>
        </div>
      </nav>
      <nav className='md:hidden border-b-2 flex items-center justify-between p-4'>
        <div>
          <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>

        <div
          typeof='button'
          onClick={() => setShowNav(!showNav)}
          className='flex items-center'
        >
          <div className="avatar">
            <div className="w-10 mask mask-hexagon">
              <img
                src={userData?.image}
              />
            </div>
          </div>
        </div>
        {
          showNav && (
            <aside className='h-screen bg-background w-screen absolute top-0 left-0 z-[9999] p-2'>
              <div className='w-full flex justify-end'>
                <Button
                  variant={"ghost"}
                  className="p-0 hover:bg-transparent"
                  onClick={() => setShowNav(!showNav)}
                >
                  <Shrink className='h-5 w-5' />
                </Button>
              </div>
              <div className='flex flex-col items-start gap-7 font-medium text-sm'>
                <div className='flex items-center gap-2'>
                  <UserButton afterSignOutUrl='/onboarding' />
                  <span className='text-lg font-bold'>Profile</span>
                </div>
                <Separator />
                <div className='flex flex-1 flex-col gap-4'>
                  <Link href="/features" className='hover:underline transition-all duration-300'>
                    <div className='flex items-center gap-1'>
                      <Hammer className='h-4 w-4' />
                      <span>Feature Board</span>
                    </div>
                  </Link>
                  <Link href="/workspace" className='hover:underline transition-all duration-300'>
                    <div className='flex items-center gap-1'>
                      <Boxes className='h-4 w-4' />
                      <span>My Workspaces</span>
                    </div>

                  </Link>
                  <Link
                    href="/settings"
                    className='hover:underline transition-all duration-300 '
                  >
                    <div className='flex items-center gap-1'>
                      <IoSettings className='h-4 w-4' />
                      <span>Settings</span>
                    </div>
                  </Link>
                </div>
                <SignOutButton>
                  <Button className='w-full font-bold'>
                    Log Out
                  </Button>
                </SignOutButton>
              </div>
            </aside>
          )
        }
      </nav>
    </>
  )
}

export default NavBar