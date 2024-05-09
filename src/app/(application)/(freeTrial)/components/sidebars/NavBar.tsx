import { Blocks, DraftingCompass, Hammer, Shrink } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import { IoSettings } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@mantine/core';
import { Separator } from '@radix-ui/react-separator';

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <nav className='hidden md:flex items-center justify-between p-4'>
        <Link href={'/'}>
          <h2 className='text-2xl font-bold'>Dozen</h2>
        </Link>
        <div className='flex gap-4 items-center'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='hover:underline transition-all duration-300'>
                  <DraftingCompass className='h-5 w-5' />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={25}>
                <p>Feature Board</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='hover:underline transition-all duration-300'>
                  <Blocks className='h-5 w-5' />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={25}>
                <p>Workspace</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='hover:underline transition-all duration-300'>
                  <IoSettings className='h-5 w-5' />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={25}>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>


      <nav className='md:hidden border-b-2 flex items-center justify-between p-4'>
        <Link href={'/'}>
          <h2 className='text-2xl font-bold'>Dozen</h2>
        </Link>
        <div
          typeof='button'
          onClick={() => setShowNav(!showNav)}
          className='flex items-center'
        >
          <div className="avatar">
            <div className="w-10 mask mask-hexagon">
            </div>
          </div>
        </div>
        {showNav && (
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
                <span className='text-lg font-bold'>Profile</span>
              </div>
              <Separator />
              <div className='flex flex-1 flex-col gap-4'>
                <div className='hover:underline transition-all duration-300'>
                  <div className='flex items-center gap-1'>
                    <Hammer className='h-4 w-4' />
                    <span>Feature Board</span>
                  </div>
                </div>
                <div className='hover:underline transition-all duration-300'>
                  <div className='flex items-center gap-1'>
                    <span>My Workspaces</span>
                  </div>
                </div>
                <div
                  className='hover:underline transition-all duration-300 '
                >
                  <div className='flex items-center gap-1'>
                    <IoSettings className='h-4 w-4 ' />
                    <span>Settings</span>
                  </div>
                </div>
              </div>
              <Button className='w-full font-bold'>
                Log Out
              </Button>
            </div>
          </aside>
        )}
      </nav>
    </>
  );
}

export default NavBar;
